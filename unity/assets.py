
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
        self.s = []



class Asset():
    def __init__(self):
        self.title = "Unnamed asset"
        self.adaptation_sets = []

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
                        r.s.extend( int(s.attrib.get("r",1))*[s.attrib["d"]])
                    adset.append(r)

                self.adaptation_sets.append(adset)

            break


    def __repr__(self):
        return self.title




assets = {}

dash_dir = "/opt/dashpack/output"
for f in os.listdir(dash_dir):
    if not f.endswith(".mpd"):
        continue

    a = Asset()
    a.load_from_mpd(os.path.join(dash_dir, f))
    a.title = os.path.splitext(f)[0]
    assets[a.title] = a
    break