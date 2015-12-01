#!/usr/bin/env python
import os
import time


class Segment():
    def __init__(self, path, duration):
        self.path = path
        self.duration = duration


def parse_m3u8(fpath):
    f = open(fpath).read()
    lines = f.split()
    for i, line in enumerate(lines):
        if line.startswith("#EXTINF"):
            inf = line.split(":")[1]
            dur = float(inf.split(",")[0])
            fname = lines[i+1]
            yield Segment(fname, dur)
            

class PlaylistItem():
    def __init__(self, playlist, index):
        self.playlist = playlist
        self.index = index
        self.segments = []

        if index == 0:
            self.start_segment = 0
            self.start_time = 0
        else:
            prev_segment = self.playlist[index - 1]
            self.start_segment = prev_segment.start_segment + prev_segment.segment_count
            self.start_time = prev_segment.start_time + prev_segment.duration        
        self.segment_count = 0
        self.duration = 0
        self.name = ""

 
    def __getitem__(self, key):
        return self.segments[key]

    def __repr__(self):
        return ("{:>04d}  {}".format(self.start_segment, self.name))

    def from_m3u8(self, path):
        self.asset_dir = os.path.split(path)[0]
        self.name = os.path.split(self.asset_dir)[1]
        for segment in parse_m3u8(path):
            segment.path = os.path.join(self.asset_dir, segment.path)
            self.segments.append(segment)
            self.segment_count += 1
            self.duration += segment.duration

    def segment_at_time(self, t):
        at_time = 0
        at_segment = 0
        for segment in self.segments:
            at_time += segment.duration
            if at_time > t:
                return at_segment
            at_segment += 1
        return 0
            

    def file_at_segment(self, i):
        return self.segments[i][0]




class Playlist():
    def __init__(self, **kwargs):
        self.items = []
        self.base_name = kwargs.get("basename", "main")
        self.start_time = time.time()


    def mk_demo(self, data_path):
        for asset_name in os.listdir(data_path):
            self.add(os.path.join(data_path, asset_name, "720p.m3u8"))
        

    def show(self):
        print ("\n")
        print ("**********************************")

        for f in self.items:
            print (f)       
 
        print ("**********************************")
        print ("\n")


    def add(self, fname):
        self.items.append(PlaylistItem(self, len(self.items)))
        self.last.from_m3u8(fname)

    
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
            return False
        return litem


    def segment_at_time(self, presentation_time):
        item = self.item_at_time(presentation_time)
        item_time = presentation_time - item.start_time
        return item.start_segment + item.segment_at_time(item_time)


    def file_at_segment(self, i):
        item = self.item_at_segment(i)
        item_segment = i - item.start_segment
        return item.segments[item_segment].path


    def manifest(self, **kwargs):
        presentation_time = time.time() - self.start_time
        starting_item = self.item_at_time(presentation_time)
        starting_item_time = presentation_time - starting_item.start_time
        media_sequence = starting_item.start_segment + starting_item.segment_at_time(starting_item_time)
        last_item_index = starting_item.index
        target_duration = 0

        result =  """#EXTM3U\n#EXT-X-VERSION:3\n#EXT-X-MEDIA-SEQUENCE:{media_sequence}\n#EXT-X-TARGETDURATION:{target_duration}\n"""

        for i in range(4):

            current_item = self.item_at_segment(media_sequence + i)
            item_segment_index = media_sequence + i - current_item.start_segment
            segment = current_item[item_segment_index]

            if current_item.index != last_item_index:
                result += "#EXT-X-DISCONTINUITY\n"
                last_item_index = current_item.index

            result += "#EXTINF:{},\n".format(segment.duration)
            result += "/media/{}-{}.ts\n".format(self.base_name, media_sequence + i)


            target_duration = int(max(target_duration, segment.duration))



        """
        i=0
        target_duration = 0
    
        for item in self.items:
            if i > 0:
                result += "#EXT-X-DISCONTINUITY\n"
            for segment in item.segments:
                result += "#EXTINF:{},\n".format(segment.duration)
                result += "/media/{}-{}.ts\n".format(self.base_name, i)

                i+=1
                target_duration = int(max(target_duration, segment.duration))

                if i == kwargs.get("segments", 4):
                    break
            else:
                continue

            break
        """

        
        result = result.format(
            media_sequence=media_sequence,
            target_duration=target_duration+1
            )

        return result





if __name__ == "__main__":
    playlist = Playlist()
    playlist.mk_demo("data")
    print (playlist.manifest())
