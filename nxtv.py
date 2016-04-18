#!/usr/bin/env python

from __future__ import print_function

import os
import sys
import cherrypy

#
# Env setup
#

if sys.version_info[:2] < (3, 0):
    reload(sys)
    sys.setdefaultencoding('utf-8')

app_root = os.path.abspath(os.getcwd())
if not app_root in sys.path:
    sys.path.append(app_root)

#
# Vendor imports
#

vendor_dir = os.path.join(app_root, "vendor")
if os.path.exists(vendor_dir):
    for pname in os.listdir(vendor_dir):
        pname = os.path.join(vendor_dir, pname)
        pname = os.path.abspath(pname)
        if not pname in sys.path:
            sys.path.insert(0, pname)

from nxtools import *
from nxtv import NXTV, config

#
# App config
#

def update_config():
    config["app_root"] = app_root
    settings_file = os.path.join(app_root, "local_settings.json")
    if os.path.exists(settings_file):
        try:
            config.update(json.load(open(settings_file)))
        except:
            log_traceback()
            critical_error("Unable to parse settings file")

update_config()
logging.user = config.get("instance_name", "nxtv")

cherrypy_config = {
        '/': {
            'tools.sessions.on': True,
            'tools.staticdir.root': app_root
            },

        '/static': {
            'tools.staticdir.on': True,
            'tools.staticdir.dir': "./site/static"
            },
    }

#
# Start server
#

if __name__ == "__main__":
    cherrypy.config.update({
        'server.socket_host': config.get("server_host", '127.0.0.1'),
        'server.socket_port': config.get("server_port", 12000),
        })

    logging.info("Starting unity server")
    cherrypy.quickstart(NXTV(), '/', cherrypy_config)
