import time
import uuid

from .common import *
from .manifest import Manifest
from .media import Media

class PlaylistItem():
    def __init__(self):
        pass

    @property
    def duration(self):
        pass

    def media(self):
        pass



class Session():
    def __init__(self, parent, auth_key, session_id, **kwargs):
        self.parent = parent
        self.auth_key = auth_key
        self.session_id = session_id
        self.kwargs = kwargs
        self.start_time = time.time()
        self.playlist = []

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
        return Media(self, "blabla", 1)





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

    def __getitem__(self, guid):
        try:    
            return self.data[guid] 
        except KeyError:
            logging.error(guid, type(guid))
            logging.error(self.data)
            raise KeyError #TODO: Raise own exception (unauthorized or something)
