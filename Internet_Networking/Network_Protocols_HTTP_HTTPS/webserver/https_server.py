import http.server
import ssl

httpd = http.server.HTTPServer(('localhost', 4443), http.server.SimpleHTTPRequestHandler)
httpd.socket = ssl.wrap_socket(httpd.socket,
                               server_side=True,
                               certfile='cert.pem',
                               keyfile='key.pem',
                               ssl_version=ssl.PROTOCOL_TLS)
print("Serving on https://localhost:4443")
httpd.serve_forever()