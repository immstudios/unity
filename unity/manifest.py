import os
import time
import rfc3339

def indent(l, s):
    return "{}{}\n".format(l*" ", s) 


MPD_TEMPLATE = """<?xml version="1.0" encoding="utf-8" ?>
<MPD {mpdattr}>
<Period id="1" start="PT0S">

{period}</Period>
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
            "minimumUpdatePeriod"   : "PT10S", 
            "maxSegmentDuration"    : "PT10S", 
            "minBufferTime"         : "PT1S",
            "profiles"              : "urn:mpeg:dash:profile:isoff-live:2011,urn:com:dashif:dash264",
        }


    @property
    def manifest(self):
        body = ""

        for adaptation_set in self.asset.adaptation_sets:

            if adaptation_set.id != "v":
                continue

            body += indent(4, "<AdaptationSet {}>".format(adaptation_set.xmlmeta ))
            for representation in adaptation_set.representations:

                if representation.id not in ["v-4000", "a-128"]:
                    continue

                timescale = int(representation.template.get("timescale", 1))

                tpl_params = {
                    "media"            : "{}-{}-$Number${}".format(self.key, representation.id, os.path.splitext(representation.template["media"])[1]),
                    "initialization"   : "{}-{}-init{}".format(self.key, representation.id, os.path.splitext(representation.template["initialization"])[1]),
                    "timescale"        : timescale,
                    "duration"         : int(self.asset.segment_duration),
                    "start_number"     : self.start_number,
                    "live_edge_number" : self.start_number
                }

                body += indent(8,  "<Representation {}>".format(representation.xmlmeta))
#                body += indent(12, "<SegmentTemplate {}/>".format(representation.xmltplmeta))
                body += indent(12, "<SegmentTemplate timescale=\"{timescale}\" duration=\"{duration}\" media=\"{media}\" initialization=\"{initialization}\" startNumber=\"{start_number}\" liveEdgeNumber=\"{live_edge_number}\"/>".format(**tpl_params))
                body += indent(8,  "</Representation>")
            body += indent(4, "</AdaptationSet>\n")

        return MPD_TEMPLATE.format(
            mpdattr=" ".join(["{}=\"{}\"".format(k, self.mpdattr[k]) for k in self.mpdattr.keys()]),
            period=body
            )






class MPD():
    def __init__(self, key, asset, asset_time, start_number, **kwargs):
        self.now = time.time()
        self.key = key
        self.asset = asset
        self.asset_time = asset_time
        self.start_number = start_number
        self.kwargs = kwargs


    @property
    def manifest(self):

        return """<?xml version="1.0" encoding="utf-8" ?>
<MPD xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="urn:mpeg:dash:schema:mpd:2011" xsi:schemaLocation="urn:mpeg:dash:schema:mpd:2011 http://standards.iso.org/ittf/PubliclyAvailableStandards/MPEG-DASH_schema_files/DASH-MPD.xsd" type="dynamic" availabilityStartTime="{{NOW}}" timeShiftBufferDepth="PT10S" minimumUpdatePeriod="PT595H" maxSegmentDuration="PT5S" minBufferTime="PT1S" profiles="urn:mpeg:dash:profile:isoff-live:2011,urn:com:dashif:dash264">
    <Period id="1" start="PT0S">
            
            <AdaptationSet group="1" mimeType="audio/mp4" minBandwidth="128000" maxBandwidth="128000" segmentAlignment="true">
              <Representation id="128kbps" bandwidth="128000" codecs="mp4a.40.2" audioSamplingRate="48000">
                <SegmentTemplate duration="8000" media="test-a-128-$Number$.m4v" initialization="test-a-128-init.mp4" startNumber="{{NUMBER}}" liveEdgeNumber="{{NUMBER}}"/>
              </Representation>
            </AdaptationSet>

            <AdaptationSet group="2" mimeType="video/mp4" segmentAlignment="true">
              <Representation id="4000kbps,1080p" frameRate="25" bandwidth="4000000" codecs="avc1.42c028" width="1920" height="1080">
                <SegmentTemplate duration="8000" media="test-v-4000-$Number$.m4v" initialization="test-v-4000-init.mp4" startNumber="{{NUMBER}}" liveEdgeNumber="{{NUMBER}}"/>
              </Representation>
            </AdaptationSet>

    </Period>
</MPD>""".replace("{{NUMBER}}", str(self.start_number)).replace("{{NOW}}", rfc3339.timestamptostr(self.now))
