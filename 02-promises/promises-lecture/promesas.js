
let compre = 10

let caramelos = new Promise(function(resolve, reject) {
  setTimeout(function() {
    if(compre >= 10) resolve(compre)
    else reject('no tenia plata')
  }, 2000)
}) 

console.log(caramelos)

//.then (sucessH, errorH)
//.then (fs, fe)
caramelos.then((value)=>console.log(value), (err) => console.log('rechazo: ', err))

caramelos.then(value => console.log('Hola soy un valor de resolucion', value))