from .transmission import Transmission



class NXTV():
    def __init__(self, **kwargs):
        self.settings = kwargs
        self.transmissions = []

    def __getitem__(self, key):
        if key in self.transmissions:
            return self.transmissions[key]
        return False
