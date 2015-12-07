import os

from nxtools import *

__all__ = ["mediatheque"]



class Segment():
    def __init__(self, path, duration):
        self.path = path
        self.duration = duration


def parse_m3u8(fpath):
    f = open(fpath).read()
    lines = f.split()
    for i, line in enumerate(lines):
        if line.startswith("#EXTINF"):
            inf = line.split(":")[1]
            dur = float(inf.split(",")[0])
            fname = lines[i+1]
            yield Segment(fname, dur)


class Clip():
    def __init__(self):
        self.media_server = "media.nxtv.cz:8085"
        self.path = ""
        self.segments = []
        self.meta = {}
        self.segment_count = 0
        self.duration = 0

    def __repr__(self):
        return "{}".format(self.meta.get("title", self.path))

    def __getitem__(self, key):
        return self.meta[key]

    def media_url(self, variant, segment):
        return "http://{}/{}/{}-{:04d}.ts".format(self.media_server, self.path, variant, segment)

    def add_variant(self, manifest_path):
        for segment in parse_m3u8(manifest_path):
            self.segments.append(segment)
            self.segment_count += 1
            self.duration += segment.duration

    def segment_at_time(self, sec):
        at_time = 0
        at_segment = 0
        for segment in self.segments:
            at_time += segment.duration
            if at_time > sec:
                return at_segment
            at_segment += 1
        return 0
            

    def file_at_segment(self, i, vari):
        return self.segments[i][0]









class Mediatheque():
    def __init__(self):
        self.data = {}
        
        """
        TODO:
        - __getitem__ from memcached
        - nebula based loader
        """

        ##################
        ## DEMO LOADER
        data_path = "data"
        for id_asset, asset_title in enumerate(os.listdir(data_path)):
            clip = Clip()
            clip.path = asset_title
            clip.add_variant(os.path.join(data_path, asset_title, "720p.m3u8"))
            self[id_asset] = clip
        ## DEMO LOADER
        ###################

    def mount(self, host, port):
        self.host = host
        self.port = port

    def keys(self):
        return self.data.keys()

    def __setitem__(self, key, value):
        assert isinstance(value, Clip)
        self.data[key] = value

    def __getitem__(self, key):
        return self.data[key]

    def show(self):
        print "\nUnity clip library:"
        for id_clip in self.data:
            print " - ", id_clip, ":",  self.data[id_clip]
        print ""    


mediatheque = Mediatheque()

