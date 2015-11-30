#!/usr/bin/env python
# -*- coding: utf-8 -*-

from __future__ import print_function

import os
import sys
import json
import uuid

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
from unity import *

#
# Configuration
#

try:
    config = json.load(open("local_settings.json"))
except:
    logging.warning("Unable to open configuration file")
    config = {}


APP_ROOT = os.path.abspath(os.path.split(sys.argv[0])[0])
TEMPLATE_ROOT = os.path.join(APP_ROOT, "site", "templates")

cherrypy_config = {
        '/': {
            'tools.sessions.on': True,
            'tools.staticdir.root': APP_ROOT
            },

        '/static': {
            'tools.staticdir.on': True,
            'tools.staticdir.dir': "./site/static"
            },
    }


unity_config = {
        "template_root" : TEMPLATE_ROOT    
    }






if __name__ == '__main__':

    #
    # Development server
    #

    logging.info("Starting development server")    
    cherrypy.quickstart(UnityServer(**unity_config), '/', cherrypy_config)

else:

    #
    # WSGI entry point
    #

    cherrypy.server.unsubscribe()
    cherrypy.engine.start()

    def application(environ, start_response):
        cherrypy.tree.mount(UnityServer(**unity_config), '/', cherrypy_config)
        return cherrypy.tree(environ, start_response)
