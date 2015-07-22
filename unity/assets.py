import os
from xml.etree import ElementTree as ET

class AdaptationSet():
    def __init__(self):
        self.id = 0
        self.attr = {}
        self.representations = []

    def append(self, representation):
        self.representations.append(representation)


class Representation():
    def __init__(self):
        self.segments = []
        self.rattr = {}
        self.tattr = {}

    @property
    def id(self):
        return self.rattr.get("id")

    def __len__(self):
        return len(self.segments)

    def segment_at(self, sec):
        timescale = int(self.tattr.get("timescale",1))
        exp_time = sec * timescale
        t =  0
        for i, d in enumerate(self.segments):
            if t >= exp_time:
                return i, d
            t += d
        return 0, 2*timescale # wild guess


class Asset():
    def __init__(self):
        self.title = "Unnamed asset"
        self.adaptation_sets = []
        self._duration = 0

    def load_from_mpd(self, fname):
        f = open(fname).read()
        ns = "{urn:mpeg:DASH:schema:MPD:2011}"
        mpd = ET.XML(f)
        for period in mpd:
            for adaptation_set in period:
                adset = AdaptationSet()
                adset.attr = adaptation_set.attrib

                for representation in adaptation_set:
                    r = Representation() 
                    tpl = representation.find(ns+"SegmentTemplate")
                    tl = tpl.find(ns+"SegmentTimeline")                    
                    r.rattr = representation.attrib
                    r.tattr = tpl.attrib
                    for s in tl:
                        r.segments.extend( (int(s.attrib.get("r",0))+1)*[int(s.attrib["d"])])
                    adset.append(r)

                self.adaptation_sets.append(adset)

            break

    def __repr__(self):
        return self.title

    @property
    def duration(self):
        if not self._duration:
            dur = 0
            r = self.adaptation_sets[0].representations[0]
            ts = int(r.tattr.get("timescale", 1))
            for s in r.segments:
                dur += float(s) / ts
            self._duration = dur
        return dur

    def segment_at(self, sec):
        return self.adaptation_sets[0].representations[0].segment_at(sec)




class AssetLibrary():
    def __init__(self, path):
        self.data = {}
        for f in os.listdir(path):
            if not f.endswith(".mpd"):
                continue
            a = Asset()
            a.load_from_mpd(os.path.join(path, f))
            a.title = os.path.splitext(f)[0]
            self.data[a.title] = a

    def keys(self):
        return self.data.keys()

    def __getitem__(self, key):
        return self.data[key]

