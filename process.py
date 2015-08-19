#!/usr/bin/env python

import os
import sys
import json
import time
import subprocess


from profiles import PROFILES


#
# TODO: Use nxtools
# 

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


def get_files(path):
    for fname in os.listdir(path):
        yield os.path.join(path, fname)



#
# Packing
#




# def packager_edash(fin, fout, repr_id):
#     ext = os.path.splitext(fin)[1]
#     stream_type = {".m4v":"video", ".m4a":"audio"}[ext]
#     args = {
#         "input" : fin,
#         "output" : fout,
#         "repr_id" : repr_id,
#         "ext" : ext,
#         "stream_type" : stream_type
#         }
# 
#     cmd = """{} """.format(PACKAGER)
#     cmd+= """'input={input},stream={stream_type},init_segment={output}/{repr_id}-init{ext},segment_template={output}/{repr_id}-$Number${ext}' """.format(**args)
#     cmd+= """-fragment_duration 2 -segment_duration 2 """
#     cmd+= """--profile live --mpd_output {output}/{repr_id}.mpd""".format(**args)
#     print cmd
# 
#     proc = subprocess.Popen(cmd, shell=True)
#     while proc.poll() == None:
#         time.sleep(.1)






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




class DashPackager():
    def __init__(self, **kwargs):
        self.config = {
                "segment_duration" : "8000"
                }
        self.config.update(kwargs)



    def encode(self, fpath, output_path, profiles):
        fname = os.path.basename(fpath)
        bname = os.path.splitext(fname)[0]
        output_path = os.path.join(output_path, bname)

        try:
            os.mkdir(output_path)
        except:
            pass

        result = True

        for pname in profiles:
            if pname.startswith("v"):
                ext = ".m4v"
            else:
                ext = ".m4a"
            fout = os.path.join(output_path, pname + ext) 

            if not os.path.exists(fout):
                r = ffmpeg(fpath, fout, profiles[pname])
                result = result and r

        return result


    def pack(self, spath, output_path):
        
        bname = os.path.split(spath)[-1]
        output_path = os.path.join(output_path, bname)
        
        try:
            os.mkdir(output_path)
        except:
            pass


        for fname in os.listdir(spath):
            fpath = os.path.join(spath, fname)
            repr_id, ext = os.path.splitext(fname)
            ext = ext[1:]


            cmd = [
                "MP4Box",
                "-dash", self.config["segment_duration"],
                "-frag", self.config.get("fragment_duration", self.config["segment_duration"]),
                "-dynamic",
                "-profile", "dashavc264:live", # "live",

                "-segment-name", repr_id + "-",
                "-segment-ext", ext,
                "-out", output_path + "/" + repr_id + ".mpd",
                fpath 
                    ]

            proc = subprocess.Popen(cmd)
            while proc.poll() == None:
                time.sleep(.1)






if __name__ == "__main__":

    try:
        config = json.load(open("local_settings.json"))
    except:
        config = {}



    source_dir  = config.get("media_input", "input")
    temp_dir    = config.get("media_encoded", "inter")
    output_dir  = config.get("media_dir", "output")

   
    packager = DashPackager()
    for fpath in get_files(source_dir):
        packager.encode(fpath, temp_dir, PROFILES)


    for spath in get_files(temp_dir): # get dirs, actually :-)
        packager.pack(spath, output_dir)


