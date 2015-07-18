#!/usr/bin/env python
# -*- coding: utf-8 -*-

from __future__ import print_function

import os
import sys

reload(sys)
sys.setdefaultencoding('utf-8')

import cgi
import time
import traceback

from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer
from SocketServer import ThreadingMixIn

from unity.assets import assets
from unity.manifest import MPD 
from unity.mimetypes import *



SHOW_START = time.time()



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
                
                fname = os.path.join("data", os.path.basename(self.path))
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
                try:
                    mpd = MPD(assets[os.path.basename(self.path)], SHOW_START)
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
        print ("")
        print ("*************************************************")
        print ("* Unity - PseudoLive MPEG DASH streaming server *")
        print ("*************************************************")
        print ("")
        HTTPServer.__init__(self, server_address, RequestHandlerClass)


if __name__ == "__main__":
    server = UnityServer(('',8080), UnityHandler)
    server.serve_forever()