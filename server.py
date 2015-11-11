#!/usr/bin/env python
# -*- coding: utf-8 -*-

from __future__ import print_function

import os
import sys
import json

#
# loading configuration file
#

try:
    config = json.load(open("local_settings.json"))
except:
    logging.warning("Unable to open configuration file")
    config = {}


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
import jinja2

from nxtools import *
from unity import *

#
# ENV Variables
#

MANIFEST_MIME = "text/txt"
MEDIA_MIME = "txt/txt"

APP_ROOT = os.path.abspath(os.getcwd()) #TODO: use script root instead pwd
TEMPLATE_ROOT = os.path.join(APP_ROOT, "site", "templates")
STATIC_ROOT = os.path.join(APP_ROOT, "site", "static")


#
# HTTP Server
#


jinja_env = jinja2.Environment(loader=jinja2.FileSystemLoader(TEMPLATE_ROOT))


def mimetype(type):
    def decorate(func):
        def wrapper(*args, **kwargs):
            cherrypy.response.headers['Content-Type'] = type
            return func(*args, **kwargs)
        return wrapper
    return decorate


class MediaServer():
    def __init__(self, asset, segment):
        self.buffer_size = 500 * 1024
        self.path = os.path.join(APP_ROOT, "data", asset, segment)
        
    @property
    def headers(self):
        return []

    def __call__(self):
        #TODO: open fallback media if file does not exist
        rfile = open(self.path, "rb")
        buff = rfile.read(self.buffer_size)
        while buff:
            yield buff
            buff = rfile.read(self.buffer_size)
        


class UnityServer(object):
    def __init__(self):
        self.unity = Unity()

    @property
    def context(self):
        return self.unity.context

    @cherrypy.expose
    def index(self):
        tpl = jinja_env.get_template('index.html')
        return tpl.render(salutation='Hello', target='World')

    @cherrypy.expose
    @mimetype(MANIFEST_MIME)
    def manifest(self, key):
        return "manifest for : {}".format(key)

    @cherrypy.expose
    @mimetype(MEDIA_MIME)
    def media(self, asset, segment):
        media = MediaServer(asset, segment)
        for header, value in media.headers:
            cherrypy.response.headers[header] = value
        return media()




def start_server():
    app_root = os.path.abspath(os.path.split(sys.argv[0])[0])
    web_root = os.path.join(app_root, "site")

    conf = {

        '/': {
            'tools.sessions.on': True,
            'tools.staticdir.root': APP_ROOT
            },
    
        '/static': {
            'tools.staticdir.on': True,
            'tools.staticdir.dir': "./site/static"
            },

        }

    cherrypy.quickstart(UnityServer(), '/', conf)




if __name__ == '__main__':
    start_server()
