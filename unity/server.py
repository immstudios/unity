import cherrypy
import jinja2

from .common import *
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

        template_root = "site/templates" #TODO: Template root
        self.jinja = jinja2.Environment(
                loader=jinja2.FileSystemLoader(template_root)
                )


    @cherrypy.expose
    def index(self):
        id_user = cherrypy.session.get("id_user")

        logging.debug(cherrypy.session.keys())
        logging.debug("id user is", id_user)

        if not id_user:
            tpl = self.jinja.get_template("login.html")
        else:
            tpl = self.jinja.get_template("player.html")

        context = {}
        return tpl.render(**context)

    @cherrypy.expose
    def default(self, attr=""):
        tpl = self.jinja.get_template("error.html")
        return tpl.render(error_number=404, error_message="Nic takovyho tu neni")



    @cherrypy.expose
    def login(self, login, password, **kwargs):
        if login=="demo" and password == "demo":
            logging.goodnews("Successfully logged in as", login)
            cherrypy.session["id_user"] = 1
        else:
            logging.error("Login failed for user", login, "with password", password)
            cherrypy.session["id_user"] = False
        raise cherrypy.HTTPRedirect("/")


    @cherrypy.expose
    def logout(self):
        cherrypy.session["id_user"] = False
        raise cherrypy.HTTPRedirect("/")
        return "logged out. <a href=\"/\">continue</a>"

    #
    #  VIDEO REQUESTS
    #    

    @cherrypy.expose
    def manifest(self):
        id_user = cherrypy.session["id_user"]
        transmission = self.transmission(id_user)
        if not transmission:
            raise cherrypy.HTTPError(403, "Unauthorized")

        #TODO: starting segment from session (and to session)

        manifest = transmission.manifest()
        for header, value in manifest_headers:
            cherrypy.response.headers[header] = value
        return manifest



    @cherrypy.expose
    def media(self, segment):
        #bname = os.path.splitext(segment)[0]
        #try:
        #    playlist_id, number = bname.split("-")
        #except:
        #    raise cherrypy.HTTPError(400, "Bad request")
        
        #media = self.playlist.file_at_segment(int(number))
        #logging.debug("{} -> {}".format(number, media))a
        media_root = "http://media.nxtv.cz/"
        media_path = "????"
        raise cherrypy.HTTPRedirect(media_root + media_path)


