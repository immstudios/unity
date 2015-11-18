from .playlist import Playlist


class Transmission():
    def __init__(self, id_user, **kwargs):
        self.id_user = id_user
        self.kwargs = kwargs


    def media(self, segment_number):
        pass


    def manifest(self, segment_number, format="hls"):
        pass