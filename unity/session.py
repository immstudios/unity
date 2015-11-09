

class Session():
    def __init__(self, guid):
        pass


class Sessions(self):
    def __init__(self):
        self.data = {}

    def __call__(self, guid):
        if not guid in self.data:
            self.data[guid] = Session(guid)
        return self.data[guid] 
