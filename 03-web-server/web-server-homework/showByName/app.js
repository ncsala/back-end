const fs = require("fs");
const http = require("http");

// Escribí acá tu servidor
http
  .createServer((request, response) => {
    fs.readFile(`${__dirname}/images/${request.url}.jpg`, (err, data) => {
      if(err) {
        response.writeHead(404, {'Content-type': 'text/plain'})
        response.end('Error 404, no se donde metiste la imagen')
      }
      else {
        response.writeHead(200, {'Content-type': 'image/jpg'})
        response.end(data)
      }
    })

  })
  .listen(3000, "127.0.0.1");
