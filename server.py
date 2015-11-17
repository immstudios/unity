#!/usr/bin/env python
# -*- coding: utf-8 -*-

from __future__ import print_function

import os
import sys
import json
import uuid

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


class UnityServer(object):
    def __init__(self):
        self.unity = Unity(
                data_dir=os.path.join(APP_ROOT, "data"),
                fallback_dir=os.path.join(APP_ROOT, "fallback")
                )

    @cherrypy.expose
    def index(self):
        cookie = cherrypy.request.cookie
        if "auth_key" in cookie.keys():
            auth_key = cookie["auth_key"].value
        else:
            auth_key = False
            
        session_id = self.unity.auth(auth_key)
        
        tpl = jinja_env.get_template('index.html')

        context = self.unity[session_id].context
        return tpl.render(**context)

    @cherrypy.expose
    def login(self):
        cookie = cherrypy.response.cookie
        cookie["auth_key"] = "developer"
        cookie["auth_key"]["path"] = '/'
        cookie["auth_key"]["max-age"] = 3600 * 24
        cookie["auth_key"]["version"] = 1
        raise cherrypy.HTTPRedirect("/")
        return "logged in. <a href=\"/\">continue</a>"


    @cherrypy.expose
    def logout(self):
        cookie = cherrypy.response.cookie
        cookie["auth_key"] = ""
        cookie["auth_key"]["path"] = '/'
        cookie["auth_key"]["max-age"] = 0
        cookie["auth_key"]["version"] = 1
        raise cherrypy.HTTPRedirect("/")
        return "logged out. <a href=\"/\">continue</a>"


    @cherrypy.expose
    @mimetype("application/x-mpegURL")
    def manifest(self, session_id):
        try:
            manifest = self.unity[session_id].manifest()
        except KeyError:
            raise cherrypy.HTTPError(403, "Unauthorized")

        print ("\n***************************\n")
        print (manifest)
        print ("\n***************************\n")
        return manifest



    @cherrypy.expose
    def media(self, segment):
        bname = os.path.splitext(segment)[0]
        try:
            session_id, number = bname.split("-")
        except:
            return "TODO: RETURN BAD REQUEST FALLBACK MEDIA"
        number = int(number)
        try:
            media = self.unity[session_id].media(number)         
        except KeyError:
            raise cherrypy.HTTPError(403, "Unauthorized")
        for header, value in media.headers:
            cherrypy.response.headers[header] = value
        return media.serve()

    media._cp_config = {'response.stream': True}




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
