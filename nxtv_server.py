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


from nxtools import *
from nxtv import start_server 


#
# Server configuration
#

nxtv_config = {
        "app_root" : app_root,
        "web_root" : web_root
        }

try:
    config = json.load(open("local_settings.json"))
except:
    logging.warning("Unable to open configuration file")
    config = {}



if __name__ == '__main__':
    logging.info("Starting development server")
    start_server()
