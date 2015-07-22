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

import os
import time
import json
import subprocess

from .common import decode_if_py3

__all__ = ["ffmpeg", "ffprobe", "join_filters", "filter_deinterlace", "filter_arc"]


def ffmpeg(fin, fout, profile, start=False, progress_handler=None):
    cmd = ["ffmpeg", "-y"]
    if start:
        cmd.extend(["-ss", str(start)])            
    cmd.extend(["-i", fin])
    for p in profile:
        if len(p) == 2 and type(p) != str:
            key, val = p
        else:
            key = p
            val = False

        cmd.append("-{}".format(key))
        if val:
            cmd.append(val)
    cmd.append(fout)
    proc = subprocess.Popen(cmd)
    while proc.poll() == None:
        time.sleep(.1)
    if proc.returncode:
        return False
    return True


def ffprobe(fname):
    if not os.path.exists(fname):
        return False
    cmd = [
        "ffprobe",
        "-show_format",
        "-show_streams",
        "-print_format", "json",
        fname
        ]
    FNULL = open(os.devnull, "w")
    proc = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=FNULL)
    while proc.poll() == None:
        time.sleep(.1)
    if proc.returncode:
        return False
    return json.loads(decode_if_py3(proc.stdout.read()))


def join_filters(*filters):
    """Joins multiple filters"""
    return "[in]{}[out]".format("[out];[out]".join(i for i in filters if i))


def filter_deinterlace():
    """Yadif deinterlace"""
    return "yadif=0:-1:0"


def filter_arc(w, h, aspect):
    """Aspect ratio convertor. you must specify output size and source aspect ratio (as float)"""
    taspect = float(w)/h
    if abs(taspect - aspect) < 0.01:
        return "scale=%s:%s"%(w,h)
    if taspect > aspect: # pillarbox
        pt = 0
        ph = h
        pw = int (h*aspect)
        pl = int((w - pw)/2.0)
    else: # letterbox
        pl = 0
        pw = w
        ph = int(w * (1/aspect))
        pt = int((h - ph)/2.0)
    return "scale=%s:%s[out];[out]pad=%s:%s:%s:%s:black" % (pw,ph,w,h,pl,pt) 
