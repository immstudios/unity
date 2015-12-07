import os
import time

from nxtools import *
from .mediatheque import mediatheque



class PlaylistItem():
    def __init__(self, playlist, index, id_clip):
        self.playlist = playlist
        self.index = index
        self.id_clip = id_clip

        if index == 0:
            self.start_segment = 0
            self.start_time = 0
        else:
            prev_item = self.playlist[index - 1]
            self.start_segment = prev_item.start_segment + prev_item.segment_count
            self.start_time = prev_item.start_time + prev_item.duration        
   
    @property
    def clip(self):
        return mediatheque[self.id_clip]
    
    @property
    def segments(self):
        return self.clip.segments

    @property
    def segment_count(self):
        return self.clip.segment_count

    @property
    def duration(self):
        return self.clip.duration

    def segment_at_time(self, t):
        return self.clip.segment_at_time(t)

    def __repr__(self):
        return "{} : {}".format(self.index, self.clip)




class Playlist():
    def __init__(self, **kwargs):
        self.items = []
        self.start_time = time.time()
        for i in mediatheque.keys():
            self.add(i)
        self.show()

    def show(self):
        print "\n"+40*"*"+"\n"+"\n".join([" - "+r.__repr__() for r in self.items])+"\n"+40*"*"+"\n" # HE HE HE :)

    def add(self, id_clip):
        self.items.append(PlaylistItem(self, len(self.items), id_clip))

    def __getitem__(self, key):
        return self.items[key]

    @property
    def last(self):
        return self.items[-1]        


    def item_at_segment(self, segment):
        litem = self.items[0]
        for item in self.items:
            if item.start_segment > segment:
                break
            litem = item
        return litem


    def item_at_time(self, presentation_time):
        litem = False
        for item in self.items:
            if item.start_time > presentation_time:
                break
            litem = item
        else:
            logging.error("Unable to find item at timestamp", int(presentation_time))
            return False
        return litem


    def segment_at_time(self, presentation_time):
        item = self.item_at_time(presentation_time)
        if not item:
            return False
        item_time = presentation_time - item.start_time
        return item.start_segment + item.segment_at_time(item_time)


    def media(self, variant, segment):
        item = self.item_at_segment(segment)
        item_segment = segment - item.start_segment
        return item.clip.media_url(variant, item_segment)


    def manifest(self, variant="720p"):
        presentation_time = time.time() - self.start_time
        starting_item = self.item_at_time(presentation_time)
        starting_item_time = presentation_time - starting_item.start_time
        media_sequence = starting_item.start_segment + starting_item.segment_at_time(starting_item_time)
        last_item_index = starting_item.index
        target_duration = 0

        result = "#EXTM3U\n"
        result+= "#EXT-X-VERSION:3\n"
        result+= "#EXT-X-MEDIA-SEQUENCE:{media_sequence}\n"
        result+= "#EXT-X-TARGETDURATION:{target_duration}\n"

        for i in range(4):

            current_item = self.item_at_segment(media_sequence + i)
            item_segment_index = media_sequence + i - current_item.start_segment
            segment = current_item.segments[item_segment_index]

            if current_item.index != last_item_index:
                result += "#EXT-X-DISCONTINUITY\n"
                last_item_index = current_item.index

            result += "#EXTINF:{},\n".format(segment.duration)
            result += "/media/{}-{}.ts\n".format(variant, media_sequence + i)

            target_duration = int(max(target_duration, segment.duration))

        result = result.format(
            media_sequence=media_sequence,
            target_duration=target_duration+1
            )
        return result

