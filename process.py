#!/usr/bin/env python

import os
import sys
import time
import subprocess


PROFILE = [
        ("s", "960x540"),
        ("pix_fmt", "yuv420p"),

        ("c:v", "libx264"),
        ("profile:v", "baseline"),
        ("b:v", "2400k"),

        ("c:a", "libfaac"),
        ("b:a", "128k")
    ]

try:
    config = json.load(open("local_settings.json"))
except:
    config = {}
    

PACKAGER  = "bin/packager"
INPUT     = "input"  # Source directory
INTER     = "inter"
OUTPUT    = "data"   # Target directory



def ffmpeg(fin, fout, profile):
    cmd = [
            "ffmpeg", "-y", 
            "-i", fin,
            ]
    for key, val in PROFILE:
        cmd.append("-{}".format(key))
        if val:
            cmd.append(str(val))
    cmd.append(fout)
    proc = subprocess.Popen(cmd)
    while proc.poll() == None:
        time.sleep(.1)



def packager(fin, fout):
    args = {
        "input" : fin,
        "output" : fout,
        }
    cmd = """{} """.format(PACKAGER)
    cmd+= """'input={input},stream=audio,init_segment={output}_init.m4a,segment_template={output}-$Number$.m4a' """.format(**args)
    cmd+= """'input={input},stream=video,init_segment={output}_init.m4v,segment_template={output}-$Number$.m4v' """.format(**args)
    cmd+= """-fragment_duration 2 -segment_duration 2 """
    cmd+= """--profile live --mpd_output {output}.mpd""".format(**args)
    print cmd

    proc = subprocess.Popen(cmd, shell=True)
    while proc.poll() == None:
        time.sleep(.1)








if __name__ == "__main__":
    for fname in os.listdir(INPUT):
        fin = os.path.join(INPUT, fname)
        ftr = os.path.join(INTER, os.path.splitext(fname)[0] + ".mp4")
        fout = os.path.join(OUTPUT, os.path.splitext(fname)[0])

        if not os.path.exists(ftr):
            ffmpeg(fin, ftr, PROFILE)

        packager(ftr, fout)

