import os
import cherrypy
import jinja2

from .common import *
from .transmissions import Transmissions

manifest_headers = [        
        ["Content-Type", "application/vnd.apple.mpegurl"],
        ["Connection", "keep-alive"],
        ["Cache-Control", "no-cache"],
        ["Access-Control-Allow-Origin", "*"],
        ["Accept-Ranges", "bytes"]
    ]

class UnityServer():
    def __init__(self, **kwargs):
        self.settings = kwargs
        self.transmissions = Transmissions(self)
        template_root = self.settings.get("template_root", "site/templates")
        self.jinja = jinja2.Environment(
                loader=jinja2.FileSystemLoader(template_root)
                )

    ##
    # SITE REQUESTS
    ##


    @cherrypy.expose
    def index(self):
        id_user = cherrypy.session.get("id_user")
        logging.debug("User ID {} requested index page".format(id_user))
        if not id_user:
            tpl = self.jinja.get_template("login.html")
        else:
            tpl = self.jinja.get_template("player.html")
        context = {}
        return tpl.render(**context)


    @cherrypy.expose
    def default(self, attr=""):
        cherrypy.response.status = 404 
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
        raise cherrypy.HTTPRedirect(kwargs.get("from_page", "/"))


    @cherrypy.expose
    def logout(self):
        cherrypy.session["id_user"] = False
        raise cherrypy.HTTPRedirect("/")
        return "logged out. <a href=\"/\">continue</a>"

    ##
    #  VIDEO REQUESTS
    ##    

    @cherrypy.expose
    def manifest(self, variant=False):
        id_user = cherrypy.session["id_user"]
        transmission = self.transmissions[id_user]
        if not transmission:
            raise cherrypy.HTTPError(403, "Unauthorized")

        manifest = transmission.manifest(variant)
        for h, v in manifest_headers:
            cherrypy.response.headers[h] = v
        return manifest


    @cherrypy.expose
    def media(self, fname):
        id_user = cherrypy.session["id_user"]
        transmission = self.transmissions[id_user]
        bname = os.path.splitext(fname)[0]
        try:
            variant, segment = bname.split("-")
            segment = int(segment)
        except:
            raise cherrypy.HTTPError(400, "Bad request")
        media_path = transmission.media(variant, segment)
        raise cherrypy.HTTPRedirect(media_path)


