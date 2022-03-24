const fs = require('fs')
const request = require('request')

module.exports = {
  date: function(args, done) {
    // process.stdout.write(Date())
    done(Date())
  },
  pwd: function(args, done) {
    // process.stdout.write(process.cwd())
    done(process.cwd())
  },
  ls: function(args, done) {
    fs.readdir('.', function(err, files) {
      if(err) throw err;
      let strFiles = ''
      // files.forEach((file) => process.stdout.write(file.toString() + '\n'))
      files.forEach((file) => strFiles = strFiles + file + '\n')
      done(strFiles) 
    })
  },
  echo: function(args, done) {
    done(args.join(' '));
  },
  //cat README.md --> arg = ['README.md']
  cat: function(args, done) {
    fs.readFile(args[0], function(err, data) {
      if(err) throw err;
      done(data)
    })
  },
  head: function(args, done) {
    fs.readFile(args[0],'utf-8', function(err, data) {
      if(err) throw err
      const firstLines = data.split('\n').slice(0, 10).join('\n')
      done(firstLines)
    })
  },
  tail: function(args, done) {
    fs.readFile(args[0],'utf-8', function(err, data) {
      if(err) throw err
      const lastLines = data.split('\n').slice(0, 10).join('\n')
      done(lastLines)
    })
  },
  curl: function(args, done) {
    request(args[0], function(err, response, body) {
      if(err) throw err
      done(body)
    })
  },

}