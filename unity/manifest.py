import time
import rfc3339

def indent(l, s):
    return "{}{}".format(l*" ", s) 


MPD_TEMPLATE = """<?xml version="1.0" encoding="utf-8" ?>
<MPD 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
    xmlns="urn:mpeg:dash:schema:mpd:2011" 
    xsi:schemaLocation="urn:mpeg:dash:schema:mpd:2011 http://standards.iso.org/ittf/PubliclyAvailableStandards/MPEG-DASH_schema_files/DASH-MPD.xsd" 
    type="dynamic" 
    availabilityStartTime="{now}" 
    publishTime="{now}" 
    timeShiftBufferDepth="PT10S" 
    minimumUpdatePeriod="PT595H" 
    maxSegmentDuration="PT5S" 
    minBufferTime="PT1S" 
    profiles="urn:mpeg:dash:profile:isoff-live:2011,urn:com:dashif:dash264">

<Period id="1" start="PT0S">

{period}    
</Period>
</MPD>
"""


class MPD():
    def __init__(self, asset, start_time, **kwargs):
        self.asset = asset
        self.start_time = start_time
        self.now = time.time()
        self.kwargs = kwargs

    @property 
    def presentation_time(self):
        return self.now - self.start_time

    @property
    def manifest(self):
        body = ""

        for adaptation_set in self.asset.adaptation_sets:
            body += indent(4, "<AdaptationSet {}>\n".format(" ".join(["{}='{}'".format(k, adaptation_set.attr[k]) for k in adaptation_set.attr.keys()]) ))
            for representation in adaptation_set.representations:

                num, dur = representation.segment_at(self.presentation_time)

                tpl_params = {
                    "media"            : representation.tattr["media"], 
                    "initialization"   : representation.tattr["initialization"],
                    "timescale"        : representation.tattr["timescale"],
                    "duration"         : dur,
                    "start_number"     : num,
                    "live_edge_number" : num
                }

                body += indent(8,  "<Representation {}>\n".format(" ".join(["{}='{}'".format(k, representation.rattr[k]) for k in representation.rattr.keys()])))
                body += indent(12, "<SegmentTemplate duration=\"{duration}\" media=\"{media}\" initialization=\"{initialization}\" startNumber=\"{start_number}\" liveEdgeNumber=\"{live_edge_number}\"/>".format(**tpl_params))
                body += indent(8,  "</Representation>\n")
            body += indent(4, "</AdaptationSet>\n\n")

        return MPD_TEMPLATE.format(
            now=rfc3339.timestamptostr(self.now),
            period=body
            )
