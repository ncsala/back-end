const commands = require('./commands/index.js')

const done = function(output) {
  process.stdout.write(output)
  process.stdout.write('\nprompt > ');
}

process.stdout.write('prompt > ');
// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on('data', function (data) {
  var args = data.toString().trim().split(' ')
  var cmd = args.shift()
  if (commands[cmd]) { 
    commands[cmd](args, done);
  } else {
    process.stdout.write('Command not found')
  }
  
});