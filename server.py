#!/usr/bin/env python

import sys
import cgi
import traceback
import time

from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer
from SocketServer import ThreadingMixIn



from unity.assets import assets





reload(sys)
sys.setdefaultencoding('utf-8')


SHOW_START = time.time()









class MPD():
    template = """
<?xml version="1.0" encoding="utf-8" ?>
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

    def __init__(self, asset, start_time, **kwargs):
        self.asset = asset
        self.start_time = start_time
        self.now = time.time()
        self.kwargs = kwargs

    @property 
    def presentation_time(self):
        return self.presentation_time - self.now

    @property
    def manifest(self):
        

        body = ""

        for adaptation_set in self.asset.adaptation_sets:
            body += "    <AdaptationSet {}>\n".format(" ".join(["{}='{}'".format(k, adaptation_set.attr[k]) for k in adaptation_set.attr.keys()]) )
            for representation in adaptation_set.representations:
                body += "        <Representation {}>\n".format(" ".join(["{}='{}'".format(k, representation.rattr[k]) for k in representation.rattr.keys()]) )
                body += "        </Representation>\n"
            body += "    </AdaptationSet>\n\n"

        return self.template.format(
            now="2015-07-15T11:06:14Z",
            period=body
            )




a = MPD(assets["sintel"], SHOW_START)
print a.manifest


sys.exit(0)



"""
    <AdaptationSet group="1" mimeType="audio/mp4" minBandwidth="128000" maxBandwidth="128000" segmentAlignment="true">
      <Representation id="128kbps" bandwidth="128000" codecs="mp4a.40.2" audioSamplingRate="48000">
        <SegmentTemplate duration="2" media="../dash/250k/bitcodin-$Number$.m4a" initialization="../dash/250k/bitcodin-init.m4a" startNumber="82121" liveEdgeNumber="82121"/>
      </Representation>
    </AdaptationSet>

    <AdaptationSet group="2" mimeType="video/mp4" segmentAlignment="true">
      <Representation id="250kbps 240p" frameRate="24" bandwidth="250000" codecs="avc1.42c00d" width="320" height="180">
        <SegmentTemplate duration="2" media="../dash/250k/bitcodin-$Number$.m4v" initialization="../dash/250k/bitcodin-init.m4v" startNumber="82121" liveEdgeNumber="82121"/>
      </Representation>
    </AdaptationSet>
"""
















class UnityHandler(BaseHTTPRequestHandler):
    def log_request(self, code='-', size='-'):  
        pass

    def _do_headers(self, mime, response, headers=[]):
        self.send_response(response)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
        for h in headers:
            handler.send_header(h[0],h[1])
        self.send_header('Content-type', mime)
        self.end_headers()

    def _echo(self, istring):
        self.wfile.write(istring)

    def result(self,  data, response=200, mime="application/dash+xml"):
        self._do_headers(mime=mime, response=response)
        self._echo(data)

    def do_GET(self):

        mpd = MPD(assets["sintel"], SHOW_START)
        self.result(mpd.manifest)




class UnityServer(ThreadingMixIn, HTTPServer):
    pass


if __name__ == "__main__":
    server = UnityServer(('',8080), UnityHandler)
    server.serve_forever()