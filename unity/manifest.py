class BaseManifest():
    def __init__(self, playlist, position):
        self.playlist = playlist
        self.position = postion

    def __call__(self):
        return "This is base manifest. Do not use."


class HLSManifest(BaseManifest):
    def __call__(self):
        return


Manifest = HLSManifest
