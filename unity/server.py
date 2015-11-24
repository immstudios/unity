import cherrypy
import jinja2

from .transmissions import Transmissions



manifest_headers = [        
        ["Content-Type", "application/vnd.apple.mpegurl"],
        ["Connection", "keep-alive"],
        ["Cache-Control" "no-cache"],
        ["Access-Control-Allow-Origin", "*"],
        ["Accept-Ranges", "bytes"]
    ]


class UnityServer():
    def __init__(self, **kwargs):
        self.settings = kwargs
        self.transmissions = Transmissions(self)

        #TODO: Template root
        template_root = "site/templates"
        self.jinja = jinja2.Environment(
                loader=jinja2.FileSystemLoader(template_root)
                )


    @cherrypy.expose
    def index(self):
        tpl = self.jinja.get_template('index.html')
        context = {}
        return tpl.render(**context)


    @cherrypy.expose
    def manifest(self):
        id_transmission
        manifest = self.transmissions[id_transmission].manifest()
        for header, value in manifest_headers:
            cherrypy.response.headers[header] = value
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




