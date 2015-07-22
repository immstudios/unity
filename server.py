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

from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer
from SocketServer import ThreadingMixIn

from unity.assets import AssetLibrary
from unity.manifest import MPD 
from unity.mimetypes import *
from unity.utils import * 

 
try:
    config = json.load(open("local_settings.json"))
except:
    config = {}
  




class UnityPlaylist():
    def __init__(self, start_time):
        self.start_time = start_time
        self.playlist = []

    def append(self, asset):
        pos = 0 if not self.playlist else self.playlist[-1][0] + asset.duration
        self.playlist.append([pos, asset])

    def __len__(self):
        return len(self.playlist)

    @property
    def duration(self):
        dur = 0
        for s, a in self.playlist:
            dur += a.duration
        return dur

    def at_time(self, s):
        s = s % self.duration
        print ("Playlist time:", s2time(s))

        for pos, asset in self.playlist:
            if s >= pos:
                return asset, s - pos
       
    def show(self):
        for pos, asset in self.playlist:
            print(s2time(pos), asset)
        print (s2time(self.playlist[-1][0] + self.playlist[-1][1].duration), "-- Playlist end --")



class UnityHandler(BaseHTTPRequestHandler):
    def log_request(self, code='-', size='-'):  
        pass

    def do_headers(self, mime, response=200, headers=[]):
        self.send_response(response)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
        for h in headers:
            handler.send_header(h[0],h[1])
        self.send_header('Content-type', mime)
        self.end_headers()

    def echo(self, istring):
        self.wfile.write(istring)

    def result(self, data, response=200, mime=DASH_MIME):
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
                
                fname = os.path.join(self.server.data_path, os.path.basename(self.path))
                if not os.path.exists(fname):
                    self.result("Media file does not exist.", 404, ERROR_MSG_MIME)
                    return
                try:
                    f = open(fname)
                    self.result(f.read(), 200, MEDIA_MIMES[ext])
                    f.close()
                    return

                except:
                    self.result(traceback.format_exc(), 500, ERROR_MSG_MIME)
                    return

            else: # get manifest
                now = time.time()

                asset, tc = playlist.at_time(now - SHOW_START)
                print (asset, tc)
                try:
                    mpd = MPD(asset, tc)
                    self.result(mpd.manifest)
                except:
                    error_message = traceback.format_exc()
                    print (error_message) 
                    self.result(error_message, 500, ERROR_MSG_MIME)
                return

        
        ##
        ## DEMO SITE
        ##

        else:
            if ext in SITE_MIMES.keys():
                #FIXME: add security :)
                fname = "site" + self.path
                try:
                    f = open(fname)
                    self.result(f.read(), 200, SITE_MIMES[ext])
                    f.close()
                    return
                except:
                    self.result("File not found", 404, ERROR_MSG_MIME)
                    return

            else:
                self.result("Unsuported file type", 404, ERROR_MSG_MIME)
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


        SHOW_START = time.time() - 500

        self.assets = AssetLibrary(config.get("data_dir", "data"))
        self.playlist = UnityPlaylist(SHOW_START)

        for asset in self.assets.keys():
            self.playlist.append(self.assets[asset])
        self.playlist.show()







if __name__ == "__main__":
    server = UnityServer((config.get("server_address", 'localhost'), config.get("server_port", 8080)), UnityHandler)
    server.data_path = config.get("data_dir", "data")
    server.serve_forever()
