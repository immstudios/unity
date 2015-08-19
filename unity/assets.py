import os
import json
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
        self.rattr = {}
        self.tattr = {}

    @property
    def id(self):
        return self.rattr.get("id")



class Asset():
    def __init__(self, fpath):
        bname = os.path.basename(os.path.splitext(fpath)[0])
        self.title = bname

        self.adaptation_sets = []

        ns = "{urn:mpeg:dash:schema:mpd:2011}"
        
        m = json.load(open(os.path.join(fpath, "manifest.json")))
        self.duration = float(m["duration"])
        self.segment_duration = float(m["segment_duration"])
        self.segment_count = int(self.duration / self.segment_duration) + 1

        for id_adset in m["adaptation_sets"]:
            
            adset = AdaptationSet()

            for id_repr in m["adaptation_sets"][id_adset]:
                mfile = os.path.join(fpath, "{}-{}.mpd".format(id_adset, id_repr))
                mxml = ET.XML(open(mfile).read())
                xperiod = mxml.find(ns + "Period")
                xadset = xperiod.find(ns + "AdaptationSet")
                if not adset.attr:
                    adset.attr = xadset.attrib
                
                r = Representation()
                xtpl = xadset.find(ns + "SegmentTemplate")
                xr = xadset.find(ns + "Representation")
                        
                r.rattr = xr.attrib
                r.tattr = xtpl.attrib

                adset.append(r)


            self.adaptation_sets.append(adset)


    def segment_at(self, sec):
        return int(sec / self.segment_duration) + 1
  
    def __repr__(self):
        return "{} ({} segments)".format(self.title, self.segment_count)


#    def load_from_mpd(self, fname):
#        f = open(fname).read()
#        ns = "{urn:mpeg:DASH:schema:MPD:2011}"
#        mpd = ET.XML(f)
#        for period in mpd:
#            for adaptation_set in period:
#                adset = AdaptationSet()
#                adset.attr = adaptation_set.attrib
#
#                for representation in adaptation_set:
#                    r = Representation() 
#                    tpl = representation.find(ns+"SegmentTemplate")
#                    tl = tpl.find(ns+"SegmentTimeline")                    
#                    r.rattr = representation.attrib
#                    r.tattr = tpl.attrib
#                    for s in tl:
#                        r.segments.extend( (int(s.attrib.get("r",0))+1)*[int(s.attrib["d"])])
#                    adset.append(r)
#
#                self.adaptation_sets.append(adset)
#
#            break


class AssetLibrary():
    def __init__(self, path):
        self.data = {}
        for aname in os.listdir(path):
            apath = os.path.join(path, aname)
            if not os.path.exists(os.path.join(apath, "manifest.json")):
                continue
            a = Asset(apath)
            self.data[a.title] = a

    def keys(self):
        return self.data.keys()

    def __getitem__(self, key):
        return self.data[key]

