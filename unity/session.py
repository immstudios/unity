import os
import time
import uuid

from .common import *
from .manifest import Manifest
#from .mediafile import MediaFile





class MediaFile():
    def __init__(self, path):
        self.path = path
        self.buffer_size = 500 * 1024
        self.fallback_dir = "fallback"

        if not os.path.exists(self.path):
            self.path = os.path.join(self.fallback_dir, "404.ts")

    @property
    def headers(self):
        return [
            ["Content-Type", "video/MP2T"],
            ["Content-Length", os.path.getsize(self.path)]
            ]

    def serve(self):
        rfile = open(self.path, "rb")
        buff = rfile.read(self.buffer_size)
        while buff:
            yield buff
            buff = rfile.read(self.buffer_size)



def parse_m3u8(fpath):
    f = open(fpath).read()
    lines = f.split()
    for i, line in enumerate(lines):
        if line.startswith("#EXTINF"):
            inf = line.split(":")[1]
            dur = float(inf.split(",")[0])
            fname = lines[i+1]
            yield fname, dur
            




class PlaylistItem():
    def __init__(self, playlist, index):
        self.playlist = playlist
        self.index = index
        self.segments = []

        if index == 0:
            self.start_segment = 0
            self.start_time = 0
        else:
            prev_segment = self.playlist[index - 1]
            self.start_segment = prev_segment.start_segment + prev_segment.segment_count
            self.start_time = prev_segment.start_time + prev_segment.duration
        
        self.segment_count = 0
        self.duration = 0
        self.name = ""

 
    def __getitem__(self, key):
        return self.segments[key]


    def __repr__(self):
        return ("{:>04d}  {}".format(self.start_segment, self.name))



    def from_m3u8(self, path):
        self.asset_dir = os.path.split(path)[0]
        self.name = os.path.split(self.asset_dir)[1]
        for path, duration in parse_m3u8(path):
            path = os.path.join(self.asset_dir, path)
            self.segments.append([path, duration])
            self.segment_count += 1
            self.duration += duration




    def segment_at_time(self, t):
        at_time = 0
        at_segment = 0
        for segment, dur in self.segments:
            at_time += dur
            if at_time > t:
                return at_segment
            at_segment += 1
        return 0
            

    def file_at_segment(self, i):
        return self.segments[i][0]




class Playlist():
    def __init__(self, session):
        self.session = session
        self.data = []

        data_dir = session.settings["data_dir"]
        for asset_name in os.listdir(data_dir):
            self.add(os.path.join(data_dir, asset_name, "720p.m3u8"))


        self.show()


    def show(self):
        print ("\n")
        print ("**********************************")

        for f in self.data:
            print (f)       
 
        print ("**********************************")
        print ("\n")


    def add(self, fname):
        self.data.append(PlaylistItem(self, len(self.data)))
        self.last.from_m3u8(fname)

    
    def __getitem__(self, key):
        return self.data[key]


    @property
    def last(self):
        return self.data[-1]        

    
    def item_at_segment(self, segment):
        litem = False
        for item in self.data:
            if item.start_segment > segment:
                break
            litem = item
        else:
            return False
        return litem


    def item_at_time(self, presentation_time):
        litem = False
        for item in self.data:
            if item.start_time > presentation_time:
                break
            litem = item
        else:
            return False
        return litem


    def segment_at_time(self, presentation_time):
        item = self.item_at_time(presentation_time)
        item_time = presentation_time - item.start_time
        return item.start_segment + item.segment_at_time(item_time)






class Session():
    def __init__(self, parent, auth_key, session_id, **kwargs):
        self.parent = parent
        self.auth_key = auth_key
        self.session_id = session_id
        self.kwargs = kwargs
        self.start_time = time.time()
        self.playlist = Playlist(self)
    
    @property
    def context(self):
        return {
            "session_id" : self.session_id        
        }


    @property
    def settings(self):
        return self.parent.settings

    @property
    def presentation_time(self):
        return time.time() - self.start_time

    def manifest(self):
        manifest = Manifest(self)
        return manifest()

    def media(self, segment):
        item = self.playlist.item_at_segment(segment)
        item_segment = segment - item.start_segment
        fpath = item.file_at_segment(item_segment)
        logging.debug("{} - {}".format(segment, fpath))
        return MediaFile(fpath)




class GuestSession(Session):
    def __init__(self):
        self.session_id = False 

guest_session = GuestSession()





class Sessions():
    def __init__(self, parent):
        self.parent = parent
        self.data = {}

    def new(self, auth_key):
        session_id = str(uuid.uuid1()).replace("-", "")
        self.data[session_id] = Session(self, auth_key, session_id)
        logging.goodnews("Created session {} for auth key {}".format(session_id, auth_key))
        return session_id

    def keys(self):
        return self.data.keys()

    @property
    def settings(self):
        return self.parent.settings

    def __getitem__(self, session_id):
        if not session_id in self.keys():
            return guest_session
        return self.data[session_id]


