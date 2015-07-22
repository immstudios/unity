
def s2time(secs, show_secs=True, show_fracs=False):
    """Converts seconds to time"""
    try:
        secs = float(secs)
    except:
        return "--:--:--.--"
    wholesecs = int(secs)
    milisecs = int((secs - wholesecs) * 100)
    hh = int(wholesecs / 3600)
    hd = int(hh % 24)
    mm = int((wholesecs / 60) - (hh*60))
    ss = int(wholesecs - (hh*3600) - (mm*60))
    r = "{:02d}:{:02d}".format(hd, mm) 
    if show_secs:
        r += ":{:02d}".format(ss)
    if show_fracs:
        r += ":{:02d}".format(milisecs)
    return r



 
