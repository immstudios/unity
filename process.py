#!/usr/bin/env python

import os
import sys
import json
import time
import subprocess

from xml.etree import ElementTree as ET

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
    return json.loads(proc.stdout.read())



def get_files(path):
    for fname in os.listdir(path):
        yield os.path.join(path, fname)



#
# Packing
#


NS = "{urn:mpeg:dash:schema:mpd:2011}"


class DashPackager():
    def __init__(self, source_path, target_dir, profiles, **kwargs):

        #
        # Default configuration
        #

        self.config = {
                "segment_duration" : 8000,
                "temp_dir" : "temp"
                }

        self.config.update(kwargs)

        #
        # Paths
        # 

        self.profiles = profiles
        self.source_path = source_path
        self.target_dir = target_dir
        
        self.basename = os.path.splitext(os.path.basename(source_path))[0]
 
        if self.config.get("auto_subdir"):
            self.target_dir = os.path.join(self.target_dir, self.basename)

        if not os.path.exists(self.target_dir):
            os.makedirs(self.target_dir)

        self.temp_dir = os.path.join(self.config["temp_dir"], self.basename)
        if not os.path.exists(self.temp_dir):
            os.makedirs(self.temp_dir)


        #
        # Source metadata
        #

        probe = ffprobe(source_path)
        duration = probe["format"]["duration"]


        #
        # Manifest skeleton
        #

        self.manifest = {
                "duration" : duration,
                "segment_duration" : self.config["segment_duration"] / 1000,
                "adaptation_sets" : []
                }





    def start(self):
        for adaptation_set in self.profiles:

            m_adaptation_set = {
                    "meta" : {},
                    "representations" : []
                    }

            for representation in adaptation_set["representations"]:
                
                #
                # Create media
                #

                filename = "{}-{}.mp4".format(
                        adaptation_set["meta"]["id"],
                        representation["meta"]["id"],
                        )

                self.encode(representation["encoding"], filename)
                m = self.pack(filename, adaptation_set["meta"]["type"])

                #
                # Update manifest
                #


                m_representation = {}

                mxml = ET.XML(open(m).read())
                xperiod = mxml.find(NS + "Period")
                xadset = xperiod.find(NS + "AdaptationSet")

                if not m_adaptation_set["meta"]:
                    m_adaptation_set["meta"] = xadset.attrib
                
                xtpl = xadset.find(NS + "SegmentTemplate")
                xr = xadset.find(NS + "Representation")
                        
                m_representation["meta"] = xr.attrib
                m_representation["template"] = xtpl.attrib

                m_adaptation_set["representations"].append(m_representation)

            self.manifest["adaptation_sets"].append(m_adaptation_set)

        #
        # Save manifest
        #


        fp = open(os.path.join(self.target_dir, "manifest.json"), "w")
        json.dump(self.manifest, fp)
        fp.close()


                




    def encode(self, profile, filename):
        encode_path = os.path.join(self.temp_dir, filename)

        if os.path.exists(encode_path):
            return True

        ffmpeg(self.source_path, encode_path, profile)





    def pack(self, filename, ftype):
        bfname = os.path.splitext(filename)[0]
        ext = "m4a" if ftype == "audio" else "m4v"
        manifest_path = os.path.join(self.target_dir, bfname + ".mpd")

        # Clean previously created files
        for f in os.listdir(self.target_dir):
            if f.startswith(bfname):
                os.remove(os.path.join(self.target_dir, f))
       
        cmd = [
            "MP4Box",
            "-dash", self.config["segment_duration"],
            "-frag", self.config.get("fragment_duration", self.config["segment_duration"]),
            "-dynamic",
            "-profile", "dashavc264:live",

            "-segment-name", bfname + "-",
            "-segment-ext", ext,
            "-out", manifest_path,
            os.path.join(self.temp_dir, filename)
                ]

        proc = subprocess.Popen(str(i) for i in cmd)
        while proc.poll() == None:
            time.sleep(.1)

        return manifest_path









if __name__ == "__main__":

    try:
        config = json.load(open("local_settings.json"))
    except:
        config = {}

    source_dir  = config.get("media_input", "input")
    temp_dir    = config.get("media_encoded", "inter")
    output_dir  = config.get("media_dir", "output")
  

    profiles = json.load(open("profiles.json"))


    for fpath in get_files(source_dir):
        packager = DashPackager(
                fpath, 
                output_dir,
                profiles,
                temp_dir=temp_dir,
                force_reencode=False,
                auto_subdir=True
                )

        packager.start()


