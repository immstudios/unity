import time

from .common import *
from .session import Sessions
from .media import Media

class Unity():
    def __init__(self, **kwargs):
        self.settings = kwargs
        self.sessions = Sessions(self) 
        self.start_time = time.time()

    def auth(self, auth_key):
        if not auth_key:
            return False

        # Allow only one active session per user
        for session_id in self.sessions.keys():
            if self.sessions[session_id].auth_key == auth_key:
                logging.debug("Removing old session {} auth key {}".format(session_id, auth_key))
                del(self.sessions.data[session_id])
        
        return self.sessions.new(auth_key)    


    def __getitem__(self, key):
        return self.sessions[key]
























class OldShitWhichIsNoLongerUsed():




    @property
    def presentation_time(self):
        return time.time() - self.start_time


    def auth(self, key=False):
        if not self.free_view:
            #TODO: check if key is authorized (db or something)
            return 403, MSG_MIME, "Not authorized"
        key = key or str(uuid.uuid1())
        self.sessions[key] = UnitySession(key)
        logging.info("Created session {}".format(key))
        return 200, MSG_MIME, key

    def is_auth(self, key):
        if (key not in self.sessions) and self.auth(key)[0] >= 300:
            return False
        return True



    def manifest(self, key):
        if not self.is_auth(key):
            return 403, MSG_MIME, "Not authorized"
        session = self.sessions[key]


        current_item = self.playlist.at_time(self.presentation_time)
        asset_time = self.presentation_time - current_item.start_time
        start_number = current_item.start_number + current_item.asset.segment_at(asset_time)

        mpd = MPD(key, current_item.asset, asset_time, start_number)
        return 200, DASH_MIME, mpd.manifest





    def media(self, key, repr_id, number, ext):
        if not self.is_auth(key):
            return 403, MSG_MIME, "Not authorized"
        session = self.sessions[key]

        if number.isdigit():
            item, item_number = self.playlist.at_number(number)
        elif number == "init":
            item = self.playlist.at_time(self.presentation_time)

        for adaptation_set in item.asset.adaptation_sets:
            for representation in adaptation_set.representations:
                if str(representation.id) == str(repr_id):
                    r = representation
                    break
            else:
                continue
            break
        else:
            logging.warning("{} representation not found in asset {}".format(f, item.asset))
            return 404, MSG_MIME, "Representation not found"

        if number.isdigit():
            fname = r.template["media"].replace("$Number$", str(item_number))
            if fname.startswith("v-1000"):
                print("NUM {:<10}{:<20}{}".format(number, item.asset.title, fname))
        elif number == "init":
            fname = r.template["initialization"]

        

        fname = os.path.join(self.parent.data_path, item.asset.title,  fname)
        if not os.path.exists(fname):
            return 404, MSG_MIME, "Media file does not exist."
        fsize = os.path.getsize(fname)
        try:
            f = open(fname)
            return 200, MEDIA_MIMES[ext], f.read(), [["Content-Length", str(fsize)], ["Connection", "keep-alive"]]
        except:
            return 500, MSG_MIME, traceback.format_exc()





