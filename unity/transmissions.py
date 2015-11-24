from .playlist import Playlist


class Transmission():
    def __init__(self, id_user, **kwargs):
        self.id_user = id_user
        self.kwargs = kwargs


    def media(self, segment_number):
        pass


    def manifest(self, segment_number, format="hls"):
        pass



class Transmissions():
    def __init__(self, parent):
        self.parent = parent
        self.data = {}

    @property
    def settings(self):
        return self.parent.settings

    def __getitem__(self, key):
        if key in self.data:
            return self.data[key]
        return False

