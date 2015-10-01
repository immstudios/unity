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

#if __name__ == '__main__':
#   cherrypy.quickstart(UnityServer())   
