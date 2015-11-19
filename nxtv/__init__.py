import cherrypy
import jinja2

from .transmission import Transmission



class NXTV():
    def __init__(self, parent=False):
        self.parent = parent
        self.transmissions = []

    @property
    def settings(self):
        if self.parent:
            return self.parent.settings
        else:
            #TODO: Default settings (don't know why - possible tests)
            return {
                }

    def __getitem__(self, key):
        if key in self.transmissions:
            return self.transmissions[key]
        return False


#
# HTTP Server
#





class NXTVServer(object):
    def __init__(self, **kwargs):
        self.settings = {
                "template_root" : "site/templates"
                }
        self.settings.update(kwargs)
        
        self.jinja_env = jinja2.Environment(
                loader=jinja2.FileSystemLoader(self.settings["template_root"])
                )

        self.nxtv = NXTV(self)

    @cherrypy.expose
    def index(self):
        tpl = jinja_env.get_template('index.html')
        context = {}
        return tpl.render(**context)


    @cherrypy.expose
    def hls(self, quailty=False):
        manifest = self.playlist.manifest()

        cherrypy.response.headers['Content-Type'] = "application/vnd.apple.mpegurl"
        cherrypy.response.headers['Connection'] = "keep-alive"
        cherrypy.response.headers['Cache-Control'] = "no-cache"
        cherrypy.response.headers['Access-Control-Allow-Origin'] = "*"
        cherrypy.response.headers['Accept-Ranges'] = "bytes"
        
        return manifest


    @cherrypy.expose
    def media(self, segment):
        bname = os.path.splitext(segment)[0]
        try:
            playlist_id, number = bname.split("-")
        except:
            raise cherrypy.HTTPError(400, "Bad request")
        
        media = self.playlist.file_at_segment(int(number))
        logging.debug("{} -> {}".format(number, media))
        raise cherrypy.HTTPRedirect("/" + media)




def start_server(**kwargs):
    conf = {

        '/': {
            'tools.sessions.on': False,
            'tools.staticdir.root': kwargs["web_root"] 
            },
    
        '/static': {
            'tools.staticdir.on': True,
            'tools.staticdir.dir': "./static"
            },

        }

    cherrypy.quickstart(NXTVServer(**kwargs), '/', conf)





