import os


class Media():
    def __init__(self, parent, asset, segment):
        self.data_dir = parent.settings.get("data_dir")
        self.fallback_dir = parent.settings.get("fallback_dir")
        self.buffer_size = 500 * 1024
        self.path = os.path.join(self.data_dir, asset, str(segment))

    @property
    def headers(self):
        #TODO: return mime, content lenght etc
        return []

    def serve(self):
        self.path = os.path.join(self.fallback_dir, "404.ts")   

        rfile = open(self.path, "rb")
        buff = rfile.read(self.buffer_size)
        while buff:
            yield buff
            buff = rfile.read(self.buffer_size)
        

