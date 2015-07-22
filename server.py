#!/usr/bin/env python
# -*- coding: utf-8 -*-

from __future__ import print_function

import os
import sys

reload(sys)
sys.setdefaultencoding('utf-8')

import cgi
import json
import time
import traceback
import uuid

from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer
from SocketServer import ThreadingMixIn

from unity.assets import AssetLibrary
from unity.manifest import MPD 
from unity.mimetypes import *
from unity.utils import * 

from nxtools.logging import logging

 
try:
    config = json.load(open("local_settings.json"))
except:
    config = {}
  




class UnityItem():
    def __init__(self, playlist, asset):
        self.playlist = playlist
        self.asset = asset

        self.segment_count = len(self.asset.adaptation_sets[0].representations[0])
        self.duration = self.asset.duration

        self.start_time = 0
        self.start_number = 1

        if self.playlist:
            prev_item = self.playlist[-1]
            self.start_time = prev_item.start_time + prev_item.duration
            self.start_number = prev_item.start_number + self.playlist[-1].segment_count

    @property
    def duration(self):
        return self.asset.duration



class UnityPlaylist():
    def __init__(self, start_time):
        self.start_time = start_time
        self.playlist = []

    def __getitem__(self, idx):
        return self.playlist[idx]

    def __len__(self):
        return len(self.playlist)

    def append(self, asset):
        item = UnityItem(self, asset)
        self.playlist.append(item)

    @property
    def duration(self):
        dur = 0
        for item in self.playlist:
            dur += item.duration
        return dur

    def at_time(self, s):
        s = s % self.duration
        print ("Playlist time:", s2time(s))

        for item in self.playlist:
            if s >= item.start_time:
                return item
       
    def show(self):
        if not self.playlist:
            print (" -- Playlist is empty --")
            return
        for item in self.playlist:
            print(s2time(item.start_time), item.asset)
        print (s2time(self.playlist[-1].start_time + self.playlist[-1].duration), "-- Playlist end --")






class UnitySession():
    def __init__(self, key):
        self.key = key
        self.offset = 0


class Unity():
    def __init__(self, parent):
        self.parent = parent
        self.free_view = True
        self.sessions = {}

        self.assets = AssetLibrary(config.get("data_dir", "data"))
        self.playlist = UnityPlaylist( time.time() )

        for asset in ["224","176"]: #self.assets.keys():
            self.playlist.append(self.assets[asset])
        self.playlist.show()


    def auth(self, key=False):
        if not self.free_view:
            #TODO: check if key is authorized (db or something)
            return 403, MSG_MIME, "Not authorized"
        key = key or str(uuid.uuid1())
        self.sessions[key] = UnitySession(key)
        logging.info("Created session {}".format(key))
        return 200, MSG_MIME, key

    def is_auth(self, key):
        if (key not in self.sessions) and self.auth(key)[0] >= 300:
            return False
        return True

    def manifest(self, key):
        if not self.is_auth(key):
            return 403, MSG_MIME, "Not authorized"
        session = self.sessions[key]

        now = time.time() - session.offset # PVR offset
        now = max(now, self.playlist.start_time)

        presentation_time = now - self.playlist.start_time

        current_item = self.playlist.at_time(presentation_time)
        asset_time = presentation_time - current_item.start_time
        start_number = current_item.start_number + current_item.asset.segment_at(asset_time)[0]

        mpd = MPD(key, current_item.asset, asset_time, start_number)
        return 200, DASH_MIME, mpd.manifest











    def media(self, key, repr_id, number, ext):
        if not self.is_auth(key):
            return 403, MSG_MIME, "Not authorized"
        session = self.sessions[key]

        f = "{}-{}-{}{}".format(key, repr_id, number, ext)
        logging.debug("Requested {}".format(f))
        
        now = time.time() - session.offset # PVR offset
        now = max(now, self.playlist.start_time)

        presentation_time = now - self.playlist.start_time
        current_item = self.playlist.at_time(presentation_time)

        repre = False

        for adaptation_set in current_item.asset.adaptation_sets:
            for representation in adaptation_set.representations:
                if str(representation.id) == str(repr_id):
                    r = representation
                    break
            else:
                continue
            break
        else:
            logging.warning("{} representation not found in asset {}".format(f, current_item.asset))
            return 404, MSG_MIME, "Representation not found"


        if number.isdigit():
            fname = r.tattr["media"].replace("$Number$", number)
        elif number == "init":
            fname = r.tattr["initialization"]

        logging.info("Serving {}".format(fname))

        fname = os.path.join(self.parent.data_path, fname)

        if not os.path.exists(fname):
            return 404, MSG_MIME, "Media file does not exist."
        try:
            f = open(fname)
            return 200, MEDIA_MIMES[ext], f.read()
        except:
            return 500, MSG_MIME, traceback.format_exc()







class UnityHandler(BaseHTTPRequestHandler):
    def log_request(self, code='-', size='-'):  
        pass

    @property
    def unity(self):
        return self.server.unity

    def do_headers(self, response, mime, headers=[]):
        self.send_response(response)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
        for h in headers:
            handler.send_header(h[0],h[1])
        self.send_header('Content-type', mime)
        self.end_headers()

    def echo(self, istring):
        self.wfile.write(istring)

    def result(self, response, mime, data):
        self.do_headers(mime=mime, response=response)
        self.echo(data)

    def do_GET(self):
        if self.path == "/":
            self.path = "/index.html"

        try:
            ext = os.path.splitext(self.path)[1]
        except:
            ext = ""
        

        ##
        ## DASH Content and app
        ##
        
        if self.path.startswith("/dash/"):
            if ext in MEDIA_MIMES.keys():

                key, repr_id, number = os.path.basename(os.path.splitext(self.path)[0]).split("-")
                self.result(*self.unity.media(key, repr_id, number, ext))

            elif ext == ".mpd":
                key = os.path.basename(os.path.splitext(self.path)[0])
                self.result(*self.unity.manifest(key))







        
        ##
        ## DEMO SITE
        ##

        else:
            if ext in SITE_MIMES.keys():
                fname = secure_filename(config.get("site_dir") + self.path)
                try:
                    f = open(fname)
                    self.result(200, SITE_MIMES[ext], f.read())
                    f.close()
                    return
                except:
                    self.result(404, MSG_MIME, "File not found")
                    return
            else:
                self.result(404, MSG_MIME, "Unsuported file type")
                return











class UnityServer(ThreadingMixIn, HTTPServer):
    def __init__(self, server_address, RequestHandlerClass):
        host, port = server_address
        HTTPServer.__init__(self, server_address, RequestHandlerClass)
        
        print ("")
        print (" ***************************************************")
        print (" *                                                 *")
        print (" *  Unity - PseudoLive MPEG DASH streaming server  *")
        print (" *                                                 *")
        print (" ***************************************************")
        print ("")
        print ("Running at: {}:{}".format(host, port))
        print ("")

        self.unity = Unity(self)






if __name__ == "__main__":
    server = UnityServer((config.get("server_address", 'localhost'), config.get("server_port", 8080)), UnityHandler)
    server.data_path = config.get("data_dir", "data")
    server.serve_forever()
