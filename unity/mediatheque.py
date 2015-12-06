import os

from nxtools import *

__all__ = ["mediatheque"]


class Mediatheque():
    #basically clone of library. but /w memacached backend
    def __init__(self):
        pass

    def mount(self, host, port):
        self.host = host
        self.port = port

    def __getitem__(self):
        pass


mediatheque = Mediatheque() #update config from .server (asi)
