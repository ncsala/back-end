const http = require("http");
const fs = require("fs");
const { isFunction } = require("util");

const beatles = [
  {
    name: "John Lennon",
    birthdate: "09/10/1940",
    profilePic:
      "https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg",
  },
  {
    name: "Paul McCartney",
    birthdate: "18/06/1942",
    profilePic:
      "http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg",
  },
  {
    name: "George Harrison",
    birthdate: "25/02/1946",
    profilePic:
      "https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg",
  },
  {
    name: "Richard Starkey",
    birthdate: "07/08/1940",
    profilePic:
      "http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg",
  },
];

http.createServer((request, response) => {
  if(request.url === '/api' || request.url === '/api/') {
    response.writeHead(200, {'Content-type': 'application/json'})
    response.end(JSON.stringify(beatles))
  }

  if(request.url.substring(0,5) === '/api/' && request.url.length > 5) {
    // url = /api/John%20Lenon
    // request.url.substring(0, 5) = '/api/'
    let findBeatle = decodeURI(request.url.split('/').pop()); // [api, John%20Lenon] // .pop -> John%20Lenon 
    //foundBeatle -> el beatle que coincide con aquel que dio true
    let foundBeatle = beatles.find((beatle) => {
      return  findBeatle === beatle.name
    })

    if(foundBeatle) {
      response.writeHead(200, {'Content-Type': 'application/json'})
      response.end(JSON.stringify(foundBeatle))
    } 
    
    if(!foundBeatle) {
      response.writeHead(404, {'Content-Type': 'application/json'})
      response.end('No encontre a ese Beatle')
    }
  }

  if(request.url === '/') {
    response.writeHead(200, {'Content-type': 'text/html'})
    const index = fs.readFileSync(`${__dirname}/index.html`, 'utf-8')
    response.end(index)
  }

  let findBeatle = request.url.split('/').pop()
  let foundBeatle = beatles.find(beatle => {
    return findBeatle === encodeURI(beatle.name)
  })

  if(foundBeatle) {
    response.writeHead(200, {'Content-type': 'text/html'})
    let read = fs.readFileSync(`${__dirname}/beatle.html`, 'utf-8')
    read = read.replace(/{name}/g, foundBeatle.name)
    read = read.replace('{birth}', foundBeatle.birthdate)
    read = read.replace('{profilePic}', foundBeatle.profilePic)
    //alternativa
    //let finalHMTL = replaceData(read, foundBeatle)
    response.end(read)
  }


}).listen(3000, "127.0.0.1");
