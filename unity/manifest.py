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


        


        result =  """#EXTM3U\n#EXT-X-VERSION:3\n#EXT-X-MEDIA-SEQUENCE:{media_sequence}\n#EXT-X-TARGETDURATION:{target_duration}\n"""
        
        
        playlist = self.session.playlist
        current_segment = playlist.segment_at_time(self.presentation_time)
        target_duration = 0
        for i in range(0, 10):
            item  = playlist.item_at_segment(current_segment + i)
            item_segment = current_segment - item.start_segment + i
            
            fname, dur = item.segments[item_segment]
           
            result += "#EXTINF:{}.\n".format(dur)
            result += "/media/{}-{}.ts\n".format(self.session_id, current_segment + i)
            target_duration += dur

        
        result = result.format(
            media_sequence=current_segment,
            target_duration=target_duration
            )

        return result






Manifest = HLSManifest
