import os
import json

KEYS_ADSET = ["id", "group", "mimeType", "minBandwidth", "maxBandwidth", "segmentAlignment", "maxWidth", "maxHeight", "maxFrameRate", "par", "lang"]
KEYS_REPR = ["id", "bandwidth", "codecs", "audioSamplingRate", "frameRate", "width", "height"]
KEYS_TPL = ["timescale", "duration", "media", "initialization", "startNumber", "liveEdgeNumber"]


class Representation():
    def __init__(self):
        self.meta = {}
        self.template = {}

    @property
    def id(self):
        return self.meta.get("id")

    @property
    def xmlmeta(self):
        return " ".join(["{}='{}'".format(k, self.meta[k]) for k in self.meta.keys()])
        return " ".join(["{}='{}'".format(k, self.meta[k]) for k in KEYS_REPR if k in self.meta.keys()])

    @property
    def xmltplmeta(self):
        return " ".join(["{}='{}'".format(k, self.template[k]) for k in self.template.keys()])
        return " ".join(["{}='{}'".format(k, self.template[k]) for k in KEYS_TPL if k in self.template.keys()])



class AdaptationSet():
    def __init__(self, **kwargs):
        self.meta = {}
        self.representations  = []
        if "from_data" in kwargs:
            self.from_data(kwargs["from_data"])

    @property
    def id(self):
        return self.meta["id"]
    
    @property
    def xmlmeta(self):
#        return " ".join(["{}='{}'".format(k, self.meta[k]) for k in self.meta.keys()])
        return " ".join(["{}='{}'".format(k, self.meta[k]) for k in KEYS_ADSET if k in self.meta.keys()])

    def from_data(self, data):
        self.meta = data["meta"]
        for m_representation in data["representations"]:
            representation = Representation()
            representation.meta= m_representation["meta"]
            representation.template= m_representation["template"]
            self.representations.append(representation)



class Asset():
    def __init__(self, path):
        self.adaptation_sets = []

        basename = os.path.basename(os.path.splitext(path)[0])
        self.title = basename

        m = json.load(open(os.path.join(path, "manifest.json")))
        self.duration = float(m["duration"])
        self.segment_duration = float(m["segment_duration"])
        self.segment_count = int(self.duration / self.segment_duration) + 1

        for m_adaptation_set in m["adaptation_sets"]:
            adaptation_set = AdaptationSet(from_data=m_adaptation_set)
            self.adaptation_sets.append(adaptation_set)


    def segment_at(self, sec):
        return int(sec / self.segment_duration) + 1
  
    def __repr__(self):
        return "{} ({} segments, {:.02f}s)".format(self.title, self.segment_count, self.duration)





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
