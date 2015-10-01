<<<<<<< HEAD
#!/usr/bin/env python
# -*- coding: utf-8 -*-

from __future__ import print_function

import os
import sys


if sys.version_info[:2] < (3, 0):
    reload(sys)
    sys.setdefaultencoding('utf-8')

#
# vendor imports
#

for pname in os.listdir("vendor"):
    pname = os.path.join("vendor", pname)
    pname = os.path.abspath(pname)
    if not pname in sys.path:
        sys.path.append(pname)  



import cherrypy

from nxtools import *
from mpd import MPD





class UnityServer(object):
    @cherrypy.expose
    def index(self):
        return "Hello world!"



def test():
    mpd = MPD()
    p = mpd.add_period()
    print (mpd.xml)


test()


sys.exit()

#if __name__ == '__main__':
#   cherrypy.quickstart(UnityServer())   

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

        self.segment_count = self.asset.segment_count
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

    @property
    def end_time(self):
        return self.start_time + self.duration
    
    @property
    def end_number(self):
        return self.start_number + self.segment_count - 1

    def __repr__(self):
        return self.asset.__repr__() + " - starts at no. " + str(self.start_number)



class UnityPlaylist():
    def __init__(self):
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

    @property
    def total_segments(self):
        n = 0
        for item in self.playlist:
            n += item.segment_count
        return n

    def at_time(self, s):
        s = s % self.duration
        for item in self.playlist:
            if item.end_time >= s:
                return item

    def at_number(self, n):
        n = int(n)-1
        n = (n % self.total_segments) +1
        for item in self.playlist:
            if item.start_number <= n <= item.end_number:
                return item, n - item.start_number + 1

       
    def show(self):
        if not self.playlist:
            print (" -- Playlist is empty --")
            return
        for item in self.playlist:
            print(s2time(item.start_time), item)
            #print(item.start_time, item.asset)
        print (s2time(self.playlist[-1].start_time + self.playlist[-1].duration), "-- Playlist end --")
        print ("\nTotal duration:", s2time(self.duration))







class UnitySession():
    def __init__(self, key):
        self.key = key
        self.offset = 0


class Unity():
    def __init__(self, parent):
        self.parent = parent
        self.free_view = True
        self.sessions = {}
        self.start_time = time.time()

        self.assets = AssetLibrary(config.get("media_dir", "data"))
        self.playlist = UnityPlaylist()

        for asset in self.assets.keys():
            self.playlist.append(self.assets[asset])
        self.playlist.show()


    @property
    def presentation_time(self):
        return time.time() - self.start_time


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


        current_item = self.playlist.at_time(self.presentation_time)
        asset_time = self.presentation_time - current_item.start_time
        start_number = current_item.start_number + current_item.asset.segment_at(asset_time)

        mpd = MPD(key, current_item.asset, asset_time, start_number)
        return 200, DASH_MIME, mpd.manifest











    def media(self, key, repr_id, number, ext):
        if not self.is_auth(key):
            return 403, MSG_MIME, "Not authorized"
        session = self.sessions[key]

        if number.isdigit():
            item, item_number = self.playlist.at_number(number)
        elif number == "init":
            item = self.playlist.at_time(self.presentation_time)

        for adaptation_set in item.asset.adaptation_sets:
            for representation in adaptation_set.representations:
                if str(representation.id) == str(repr_id):
                    r = representation
                    break
            else:
                continue
            break
        else:
            logging.warning("{} representation not found in asset {}".format(f, item.asset))
            return 404, MSG_MIME, "Representation not found"

        if number.isdigit():
            fname = r.template["media"].replace("$Number$", str(item_number))
            if fname.startswith("v-1000"):
                print("NUM {:<10}{:<20}{}".format(number, item.asset.title, fname))
        elif number == "init":
            fname = r.template["initialization"]

        

        fname = os.path.join(self.parent.data_path, item.asset.title,  fname)
        if not os.path.exists(fname):
            return 404, MSG_MIME, "Media file does not exist."
        fsize = os.path.getsize(fname)
        try:
            f = open(fname)
            return 200, MEDIA_MIMES[ext], f.read(), [["Content-Length", str(fsize)], ["Connection", "keep-alive"]]
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
            self.send_header(h[0],h[1])
        self.send_header('Content-Type', mime)
        self.end_headers()

    def echo(self, istring):
        self.wfile.write(istring)

    def result(self, response, mime, data, headers=[]):
        self.do_headers(mime=mime, response=response, headers=headers)
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
                key, adset_id, repr_id, number = os.path.basename(os.path.splitext(self.path)[0]).split("-")
                repr_id = adset_id + "-" + repr_id
                self.result(*self.unity.media(key, repr_id, number, ext))

            elif ext == ".mpd":
                key = os.path.basename(os.path.splitext(self.path)[0])
                self.result(*self.unity.manifest(key))

            else:
                self.result(500, MSG_MIME, "Unknown media type")



        if self.path.startswith("/direct/") and ext in [".mp4", ".m4v", ".m4a", ".mpd"]:
            fname = self.server.data_path + self.path.replace("/direct", "")
            if os.path.exists(fname):
                mime = {".mpd" : "application/xml", ".m4v" : "video/x-m4v", ".m4a" : "audio/x-m4v", ".mp4" : "video/mp4"}[ext]

                f = open(fname)
                self.result(200, mime, f.read())
                f.close()
                return
            

        
        ##
        ## DEMO SITE
        ##

        else:
            if ext in SITE_MIMES.keys():
                fname = secure_filename(config.get("site_dir", "site") + self.path)
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











#class UnityServer(ThreadingMixIn, HTTPServer):
class UnityServer(HTTPServer):
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
    server.data_path = config.get("media_dir", "data")
 
#    for i in range(1,20):
#        server.unity.media("X", "v-1000", str(i), "m4v")

    server.serve_forever()

>>>>>>> 78955ce87a1459a3ee420cc94d1e0043be0721dd
