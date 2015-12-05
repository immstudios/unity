import uuid
import time

from .playlist import Playlist

class Transmission():
    def __init__(self, parent, id_user, **kwargs):
        self.id_user = id_user
        self.kwargs = kwargs
        self.guid = str(uuid.uuid1()).replace("-", "")
        self.playlist = Playlist(
                basename=self.guid
                )
        self.accessed()

        self.latest_segment = 0

    def dump(self):
        return {
            "id_user" : self.id_user,
            "playlist" : self.playlist.dump,
            }

    def remaining_time(self):
        pass

    def accessed(self):
        self.last_access = time.time()

    def media(self, variant, segment):
        return self.playlist.media(variant, segment)

    def manifest(self, variant):
        return self.playlist.manifest(variant)



class Transmissions():
    def __init__(self, parent):
        self.parent = parent
        self.data = {}

    @property
    def settings(self):
        return self.parent.settings

    def keys():
        self.data.keys()

    def create(self, id_user):
        if not id_user in self.data:
            self.data[id_user] = Transmission(self, id_user)
    
    def clean_up(self):
        max_age = 3600
        for id_user in self.data:
            transmission = self.data[id_user] # Cannot use self.__getitem__() : we don't want to update last_access
            if time.time() - transmission.last_access > max_age:
                del(self.data[id_user])

    def __getitem__(self, id_user):
        if not id_user in self.data:
            self.create(id_user)
        self.data[id_user].accessed()
        return self.data[id_user]

