#!/usr/bin/env python

import os
import sys
import time
import subprocess


from profiles import PROFILES


try:
    config = json.load(open("local_settings.json"))
except:
    config = {}





PACKAGER  = "bin/packager"
INPUT     = "input"  # Source directory
INTER     = "inter"
OUTPUT    = "output"   # Target directory

  

def ffmpeg(fin, fout, profile):
    cmd = [
            "ffmpeg", "-y", 
            "-i", fin,
            ]
    for key, val in profile:
        cmd.append("-{}".format(key))
        if val:
            cmd.append(str(val))
    cmd.append(fout)
    proc = subprocess.Popen(cmd)
    while proc.poll() == None:
        time.sleep(.1)



def packager_edash(fin, fout, repr_id):
    ext = os.path.splitext(fin)[1]
    stream_type = {".m4v":"video", ".m4a":"audio"}[ext]
    args = {
        "input" : fin,
        "output" : fout,
        "repr_id" : repr_id,
        "ext" : ext,
        "stream_type" : stream_type
        }

    cmd = """{} """.format(PACKAGER)
    cmd+= """'input={input},stream={stream_type},init_segment={output}/{repr_id}-init{ext},segment_template={output}/{repr_id}-$Number${ext}' """.format(**args)
    cmd+= """-fragment_duration 2 -segment_duration 2 """
    cmd+= """--profile live --mpd_output {output}/{repr_id}.mpd""".format(**args)
    print cmd

    proc = subprocess.Popen(cmd, shell=True)
    while proc.poll() == None:
        time.sleep(.1)





def packager_mp4box(fin, fout, repr_id):

    cmd = [
        "MP4Box",
        "-dash", "2000",
        "-frag", "2000",
#        "-rap",
        "-dynamic",
        "-profile", "live",
        "-tmp", "tmp",

        "-segment-name", repr_id + "-",
        "-segment-ext", "mp4",
        "-out", fout + "/" + repr_id + ".mpd",
        fin
            ]
    print (cmd)
    proc = subprocess.Popen(cmd)
    while proc.poll() == None:
        time.sleep(.1)








def encode_all():
    for fname in os.listdir(INPUT):
        bname = os.path.splitext(fname)[0]
        fin = os.path.join(INPUT, fname)
        foutpath = os.path.join(INTER, os.path.splitext(fname)[0])
        try:
            os.mkdir(foutpath)
        except:
            pass

        for pname in PROFILES:
            if pname.startswith("v"):
                ext = ".m4v"
            else:
                ext = ".m4a"
            fout = os.path.join(foutpath, pname + ext) 

            if not os.path.exists(fout):
                ffmpeg(fin, fout, PROFILES[pname])


def pack_all():
    for bname in os.listdir(INTER):
        finpath = os.path.join(INTER, bname)
        foutpath = os.path.join(OUTPUT, bname)
        try:
            os.mkdir(foutpath)
        except:
            pass

        for fname in os.listdir(finpath):
            fin = os.path.join(finpath, fname)
            repr_id = os.path.splitext(fname)[0]
            
            #print ("outpath", foutpath)
            #packager_mp4box(fin, foutpath, repr_id)
            packager_edash(fin, foutpath, repr_id)


def check_nums():
    for bname in os.listdir(OUTPUT):
        rset = {}
        for fname in os.listdir(os.path.join(OUTPUT, bname)):
            ext = os.path.splitext(fname)[1]
            if not ext in [".m4v", ".m4a"]:
                continue
            rid = fname.split("-")[0]
            if not rid in rset:
                rset[rid] = 0

            rset[rid] += 1
        
        print ""
        for rid in rset:
            print rid, rset[rid]




class DashProcessor()
    def __init__(self, **kwargs)
        self.config = {
                "source_path" : "input",
                "inter_path" : "inter",
                "target_path" : "data",

                "segment_duration" : "2000"
                
                }
        self.config.update(kwargs)


    



if __name__ == "__main__":
#    encode_all()
#    pack_all()
    check_nums()
