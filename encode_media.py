#!/usr/bin/env python
# -*- coding: utf-8 -*-

from __future__ import print_function

import os
import sys
import json

##
# Vendor imports
##

for pname in os.listdir("vendor"):
    pname = os.path.join("vendor", pname)
    pname = os.path.abspath(pname)
    if not pname in sys.path:
        sys.path.append(pname)  

from nxtools import *
 
##
# Encoder class
##

class UnityEncoder():
    def __init__(self, path, **kwargs):
        self.input_path = path
        self.base_name = kwargs.get("base_name", False) or base_name(path)
        self.settings = {
            "passes" : 2,
            "inter_dir" : "/tmp/",
            "output_dir" : "data",
            "width" : 1280,
            "height" : 720,
            "pixel_format" : "yuv420p",
            "video_bitrate" : "4000k",
            "audio_bitrate" : "128k",
            "audio_sample_rate" : 48000,
            "frame_rate" : 25,
            "x264_preset" : "slow",
            "x264_profile" : "main",
            "x264_level" : "4.0",
            "logo" : "resources/logo.png",
            "expand_levels" : True, 
            }
        self.settings.update(kwargs)


    def process(self, **kwargs):   
        self.settings.update(kwargs)
        profile_name = self.settings.get("profile_name", self.settings["video_bitrate"])

        ##
        # FFMPEG Filters
        ##

        filter_array = []
        if self.settings.get("logo", False):
            filter_array.append("movie={}[watermark];[watermark]scale={}:{}[watermark]".format(self.settings["logo"], self.settings["width"], self.settings["height"]))
        filter_array.append("[in]null[out]")
        if self.settings.get("expand_levels"):
            filter_array.append("[out]colorlevels=rimin=0.0625:gimin=0.0625:bimin=0.0625:rimax=0.9375:gimax=0.9375:bimax=0.9375[out]")
        filter_array.append("[out]scale={}:{}[out]".format(self.settings["width"], self.settings["height"]))
        if self.settings.get("logo", False):
            filter_array.append("[out][watermark]overlay=0:0[out]")
        filters = ";".join(filter_array)

        ##
        # Encoding profile
        ##

        self.profile_pass1 = [
                ["y", None],
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
                ["y", None],
                ["c:a", "libfdk_aac"],
                ["b:a", self.settings["audio_bitrate"]],
                ["ar", self.settings["audio_sample_rate"]],
                ["r", self.settings["frame_rate"]],
                ["filter:v", filters],
                ["c:v", "libx264"],
                ["b:v", self.settings["video_bitrate"]],
                ["profile:v" , self.settings["x264_profile"]],
                ["level", self.settings["x264_level"]],
                ["preset:v", self.settings["x264_preset"]],
                ["video_track_timescale", self.settings["frame_rate"]],
            ]

        if self.settings["passes"] == 2:
            self.profile_pass2.append(["pass", 2])

        self.profile_pack = [
                ["c:v", "copy"],
                ["c:a", "copy"],
                ["bsf:v", "h264_mp4toannexb"],
                ["hls_list_size", "0"],
                ["hls_segment_filename", os.path.join(self.settings["output_dir"], self.base_name, "{}-%04d.ts".format(profile_name))]
            ]

        ##
        # Clip trimming
        ##

        mark_in = self.settings.get("mark_in", False)
        mark_out = self.settings.get("mark_out", False)
        duration = False
        if mark_out:
            duration = mark_out
            if mark_in:
                duration -= mark_in

        ##
        # Encode media
        ##

        input_path = self.input_path
        inter_dir = self.settings["inter_dir"]
        inter_path = os.path.join(inter_dir, "{}.mp4".format(self.base_name))

        if not os.path.exists(inter_dir):
            os.makedirs(inter_dir)

        if not os.path.exists(inter_path):
            if self.settings["passes"] == 2:
                # FIRST PASS
                ffmpeg(input_path, "/dev/null", self.profile_pass1, start=mark_in, duration=duration)
            
            # FINAL PASS
            ffmpeg(input_path, inter_path, self.profile_pass2, start=mark_in, duration=duration)

        if not os.path.exists(inter_path):
            return False

        ##
        # Create package
        ##

        output_dir = os.path.join(self.settings["output_dir"], self.base_name)
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)
        output_path = os.path.join(output_dir, "{}.m3u8".format(profile_name))
       
        ffmpeg(inter_path, output_path, self.profile_pack)
        
        ##
        # Remove log files
        ##

        try:
            os.remove("ffmpeg2pass-0.log")
            os.remove("ffmpeg2pass-0.log.mbtree")
        except:
            pass

#
# 
#

if __name__ == "__main__":

    config = {
        "input_dir" : "input",
        "output_dir" :  "output"
    }

    try:
        config.update (json.load(open("local_settings.json")))
    except:
        log_error()
