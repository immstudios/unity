#!/usr/bin/env python
# -*- coding: utf-8 -*-

from __future__ import print_function

import os
import sys
import json

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
from mpd import *
from unity import *


 
try:
    config = json.load(open("local_settings.json"))
except:
    config = {}
  


def mimetype(type):
    def decorate(func):
        def wrapper(*args, **kwargs):
            cherrypy.response.headers['Content-Type'] = type
            return func(*args, **kwargs)
        return wrapper
    return decorate


class UnityServer(object):
    @cherrypy.expose
    def index(self):
        return "Hello world!"
    
    @cherrypy.expose
    @mimetype(DASH_MIME)
    def mpd(self):
        return ""



def test():
    mpd = MPD()
    p = mpd.add_period()
    print (mpd.xml)


test()
sys.exit()

#if __name__ == '__main__':
#   cherrypy.quickstart(UnityServer())   

