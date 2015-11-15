class BaseManifest():
    def __init__(self, session):
        self.session = session

    @property
    def session_id(self):
        return self.session.session_id

    @property
    def presentation_time(self):
        return self.session.presentation_time

    def __call__(self):
        return "This is base manifest. Do not use."


class HLSManifest(BaseManifest):
    def __call__(self):

        ms = int(self.presentation_time/2)

        result =  """#EXTM3U\n#EXT-X-VERSION:3\n#EXT-X-MEDIA-SEQUENCE:{media_sequence}\n#EXT-X-TARGETDURATION:{target_duration}\n"""
        result = result.format(
            media_sequence=ms,
            target_duration=10
            )

        for i in range(0, 10):
            result += "#EXTINF:2.000,\n/media/{}-{}.ts\n".format(self.session_id, i+ms)
 

        """
        #EXTINF:6.160,
        nxtv-544958.ts
        #EXTINF:6.200,
        nxtv-544959.ts
        #EXTINF:6.840,
        nxtv-544960.ts
        #EXTINF:5.080,
        nxtv-544961.ts
        #EXTINF:9.080,
        nxtv-544962.ts
        #EXTINF:5.600,
        nxtv-544963.ts 
        """

        return result






Manifest = HLSManifest
