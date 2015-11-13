#!/usr/bin/env python
# -*- coding: utf-8 -*-

from __future__ import print_function

import os
import sys
import json

#
# vendor imports
#

for pname in os.listdir("vendor"):
    pname = os.path.join("vendor", pname)
    pname = os.path.abspath(pname)
    if not pname in sys.path:
        sys.path.append(pname)  

from nxtools import *
 
#
# Configuration defaults
#

try:
    new_cfg = json.load(open("local_settings.json"))
except:
    log_error()
else:
    config.update(new_cfg)

#
# Encoder class itself
#

class UnityEncoder():
    def __init__(self, path, **kwargs):
        #
        # Encoder settings
        #

        self.settings = {
            "inter_dir" : "inter",
            "output_dir" : "data",
            "width" : 1280,
            "height" : 720,
            "pixel_format" : "yuv420p",
            "video_bitrate" : "4000k",
            "audio_bitrate" : "192k",
            "frame_rate" : 25,
            "x264_preset" : "slow",
            "x264_profile" : "baseline",
            "x264_level" : "4.0",
            "logo" : "resources/logo.png",
            "expand_levels" : True, 
            }
        self.settings.update(kwargs)

        #
        # Paths
        #

        self.input_path = path
        self.base_name = self.settings.get("base_name", False) or  base_name(path)
        
        #
        # FFMPEG Filters
        #

        filter_array = []
        if config.get("logo", False):
            filter_array.append("movie={}[watermark];[watermark]scale={}:{}[watermark]".format(config["logo"], config["width"], config["height"]))
        filter_array.append("[in]null[out]")
        if config.get("expand_levels"):
            filter_array.append("[out]colorlevels=rimin=0.0625:gimin=0.0625:bimin=0.0625:rimax=0.9375:gimax=0.9375:bimax=0.9375[out]")
        filter_array.append("[out]scale={}:{}[out]".format(config["width"], config["height"]))
        if config.get("logo", False):
            filter_array.append("[out][watermark]overlay=0:0[out]")
        filters = ";".join(filter_array)

        #
        # Encoding profile
        #

        self.profile_pass1 = [
                ["an", None],
                ["r", self.settings["frame_rate"]],
                ["filter:v", filters],
                ["c:v", "libx264"],
                ["b:v", self.settings["video_bitrate"]],
                ["pass", 1],
                ["profile:v" , self.settings["x264_profile"]],
                ["level", self.settings["x264_level"]],
                ["preset:v", self.settings["x264_preset"]],
                ["video_track_timescale", [self.settings["frame_rate"]]],
                ["f", "null"]
            ]
         
        self.profile_pass2 = [
                ["c:a", "libfdk_aac"],
                ["b:a", self.settings["audio_bitrate"]],
                ["r", self.settings["frame_rate"]],
                ["filter:v", filters],
                ["c:v", "libx264"],
                ["b:v", self.settings["video_bitrate"]],
                ["pass", 2],
                ["profile:v" , self.settings["x264_profile"]],
                ["level", self.settings["x264_level"]],
                ["preset:v", self.settings["x264_preset"]],
                ["video_track_timescale", self.settings["frame_rate"]],
            ]

        self.profile_pack = [
                ["c:v", "copy"],
                ["c:a", "copy"],
                ["bsf:v", "h264_mp4toannexb"],
                ["hls_list_size", "0"],
                ["hls_segment_filename", os.path.join(odir, "720p-%04d.ts")]
            ]



    def process(self):
        input_path = self.input_path
        inter_dir = self.settings["inter_dir"]
        inter_path = os.path.join(inter_dir, "{}.mp4".format(self.base_name))

        if not os.path.exists("inter_dir"):
            os.makedirs(inter_dir)

        if not os.path.exists(inter_path):
            # FIRST PASS
            ffmpeg(input_path, "/dev/null", self.profile_pass1) #, start=asset["mark_in"] or False, duration=asset.duration)
            
            # SECOND PASS
            ffmpeg(input_path, inter_path, self.profile_pass2) #, start=asset["mark_in"] or False, duration=asset.duration)

        if not os.path.exists(inter_path):
            return False
        
        output_dir = 

        odir = os.path.join(OUTPUT_DIR, bname)
        if not os.path.exists(odir):
            os.makedirs(odir)
        opath = os.path.join(odir, "720p.m3u8")
       
        ffmpeg(fpath, opath, HLS_PROFILE)

#
# 
#

if __name__ == "__main__":
    pass




