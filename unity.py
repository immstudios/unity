#!/usr/bin/env python

import sys
import cgi
import traceback

from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer
from SocketServer import ThreadingMixIn


reload(sys)
sys.setdefaultencoding('utf-8')


class UnityHandler(BaseHTTPRequestHandler):
    def log_request(self, code='-', size='-'): 
        pass

    def _do_headers(self, mime, response=200, headers=[]):
        self.send_response(response)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
        for h in headers:
            handler.send_header(h[0],h[1])
        self.send_header('Content-type', mime)
        self.end_headers()

    def _echo(self,istring):
        self.wfile.write(istring)

    def result(self,  data, response, mime="application/dash+xml"):
        self._do_headers(mime=mime, response=response)
        self._echo(data)

    @property
    def sessions(self):
        return self.server.service.sessions


    def do_GET(self):
        pass




class UnityServer(ThreadingMixIn, HTTPServer):
    pass


if __name__ == "__main__":
    server = UnityServer(('',8080), UnityHandler)
    server.serve_forever()