#!/usr/bin/env python

import time


class Representation():
    def __init__(self, adaptation_set, **kwargs):
        self.adaptation_set = adaptation_set
        self.params = {
                
                }


    def __repr__(self):
        template_attrs = [
                "duration",
                "media",
                "initialization",
                "startNumber",
                "liveEdgeNumber"
                ]
        
        representation_attrs = [
                "id",
                "bandwidth",
                "codecs",
                "audioSamplingRate"
                ]

        result  = "<Representation"
        for param in self.params:
            if params in representation__attrs:
                result += " {}=\"{}\""
        result += ">\n"

        result += "    <SegmentTemplate"
        for param in self.params:
            if params in template_attrs:
                result += " {}=\"{}\""
        result += "/>\n"

        result += "</Representation>"





class AdaptationSet():
    def __init__(self, mpd, **kwargs):
        self.mpd = mpd
        self.params = {
                "mime_type" : ""
                }

    def __repr__(self):
        result = "<AdaptationSet\n"
        for param in self.params:
            result += " {}=\"{}\""
        result += "/>\n"


        for representation in self.representations:
            for line in representation.__repr__().split("\n"):
                result += " "*4 + line + "\n"

        result += "</AdaptationSet>"
 


class MPD():
    def __init__(self):
        self.adaptation_sets = []
        self.timestamp = int(time.time())
    
    def __repr__(self):
        result = "<MPD\n" 
        result += "    xsi:schemaLocation=\"urn:mpeg:dash:schema:mpd:2011 http://standards.iso.org/ittf/PubliclyAvailableStandards/MPEG-DASH_schema_files/DASH-MPD.xsd\"\n" 
        result += "    type=\"dynamic\"\n" 
        result += "    availabilityStartTime=\"2015-07-02T09:56:39Z\"\n" 
        result += "    publishTime=\"2015-07-02T09:56:39Z\"\n" 
        result += "    timeShiftBufferDepth=\"PT10S\"\n" 
        result += "    minimumUpdatePeriod=\"PT595H\"\n" 
        result += "    maxSegmentDuration=\"PT5S\"\n" 
        result += "    minBufferTime=\"PT1S\"\n"
        result += "    profiles=\"urn:mpeg:dash:profile:isoff-live:2011,urn:com:dashif:dash264\"\n"
        result += "    >\n\n"

        result += "    <Period id=\"1\" start=\"PT0S\">\n"

        for adaptation_set in self.adaptation_sets:
            for line in adaptation_set.__repr__().split("\n"):
                result += " "*8 + line + "\n"

        result += "    </Period>\n"
        result += "</MPD>"
        return result


if __name__ == "__main__":
    mpd = MPD()
    print mpd
