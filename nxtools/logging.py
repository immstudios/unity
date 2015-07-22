#!/usr/bin/env python

# The MIT License (MIT)
#
# Copyright (c) 2015 imm studios, z.s.
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.
#

import sys

WINDOWS = 0
UNIX = 1

DEBUG = 0
INFO = 1
WARNING = 2
ERROR = 3
GOOD_NEWS = 4


class Log():
    def __init__(self, user="nxtools"):
        self.platform = WINDOWS if sys.platform == "win32" else UNIX
    
        self.user = user
        self.formats = {
            DEBUG     : "DEBUG      \033[34m{0:<15} {1}\033[0m",
            INFO      : "INFO       {0:<15} {1}",
            WARNING   : "\033[33mWARNING\033[0m    {0:<15} {1}",
            ERROR     : "\033[31mERROR\033[0m      {0:<15} {1}",
            GOOD_NEWS : "\033[32mGOOD NEWS\033[0m  {0:<15} {1}"
            }

    def _send(self, msgtype, message):
        if self.platform == UNIX:
            try:
                print (self.formats[msgtype].format(self.user, message))
            except:
                print (message.encode("utf-8"))
        else:
            try:
                print ("{0:<10} {1:<15} {2}".format(msgtype, self.user, message))
            except:
                print (message.encode("utf-8"))


    def debug(self,msg):
        self._send("DEBUG", msg)

    def info(self,msg):
        self._send("INFO", msg)

    def warning(self,msg):
        self._send("WARNING", msg)

    def error(self,msg):
        self._send("ERROR", msg)
    
    def goodnews(self,msg):
        self._send("GOOD NEWS", msg)


logging = Log()
