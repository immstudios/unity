import os
import time
import rfc3339

def indent(l, s):
    return "{}{}".format(l*" ", s) 


MPD_TEMPLATE = """<?xml version="1.0" encoding="utf-8" ?>
<MPD {mpdattr}>
<Period id="1" start="PT0S">
{period}    
</Period>
</MPD>
"""


class MPD():
    def __init__(self, key, asset, asset_time, start_number, **kwargs):
        self.now = time.time()
        self.key = key
        self.asset = asset
        self.asset_time = asset_time
        self.start_number = start_number
        self.kwargs = kwargs

        self.mpdattr = {
            "xmlns:xsi"             : "http://www.w3.org/2001/XMLSchema-instance",
            "xmlns"                 : "urn:mpeg:dash:schema:mpd:2011", 
            "xsi:schemaLocation"    : "urn:mpeg:dash:schema:mpd:2011 http://standards.iso.org/ittf/PubliclyAvailableStandards/MPEG-DASH_schema_files/DASH-MPD.xsd",
            "type"                  : "dynamic",
            "availabilityStartTime" : rfc3339.timestamptostr(self.now),
            "publishTime"           : rfc3339.timestamptostr(self.now),
            "timeShiftBufferDepth"  : "PT10S",
            "minimumUpdatePeriod"   : "PT5S", 
            "maxSegmentDuration"    : "PT5S", 
            "minBufferTime"         : "PT1S",
            "profiles"              : "urn:mpeg:dash:profile:isoff-live:2011,urn:com:dashif:dash264",
        }


    @property
    def manifest(self):
        body = ""

        for adaptation_set in self.asset.adaptation_sets:
            body += indent(4, "<AdaptationSet {}>\n".format(" ".join(["{}='{}'".format(k, adaptation_set.attr[k]) for k in adaptation_set.attr.keys()]) ))
            for representation in adaptation_set.representations:

                num, dur = representation.segment_at(self.asset_time)

                tpl_params = {
                    "media"            : "{}-{}-$Number${}".format(self.key, representation.id, os.path.splitext(representation.tattr["media"])[1]),
                    "initialization"   : "{}-{}-init{}".format(self.key, representation.id, os.path.splitext(representation.tattr["initialization"])[1]),
                    "timescale"        : representation.tattr.get("timescale", 1),
                    "duration"         : dur,
                    "start_number"     : self.start_number,
                    "live_edge_number" : self.start_number
                }

                body += indent(8,  "<Representation {}>\n".format(" ".join(["{}='{}'".format(k, representation.rattr[k]) for k in representation.rattr.keys()])))
                body += indent(12, "<SegmentTemplate duration=\"{duration}\" media=\"{media}\" initialization=\"{initialization}\" startNumber=\"{start_number}\" liveEdgeNumber=\"{live_edge_number}\"/>".format(**tpl_params))
                body += indent(8,  "</Representation>\n")
            body += indent(4, "</AdaptationSet>\n\n")

        return MPD_TEMPLATE.format(
            mpdattr=" ".join(["{}=\"{}\"".format(k, self.mpdattr[k]) for k in self.mpdattr.keys()]),
            period=body
            )
