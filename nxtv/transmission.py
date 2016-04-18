from hls import *

from .common import *




class Transmission():
    def __init__(self):
        pass


    def manifest(self):
        manifest = HLSManifest()
        return manifest.render()


    def media(self):
        pass
