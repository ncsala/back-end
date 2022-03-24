let primerMetodo = function () {
  let promise = new Promise(function (resolve, reject) {
    setTimeout(function () {
      console.log("Termino el primer método");
      // reject(new Error('Error')) //Si queremos que no se resuelva la primer promesa
      resolve({ num: "123" }); //pasamos unos datos para ver como los manejamos
    }, 2000); // para simular algo asincronico hacemos un setTimeOut de 2 s
  });
  return promise;
};

let segundoMetodo = function (datos) {
  let promise = new Promise(function (resolve, reject) {
    setTimeout(() => {
      console.log("Terminó el segundo método");
      resolve({ nuevosDatos: datos.num + " concatenamos texto y lo pasamos" });
    }, 2000);
  });
  return promise;
};

let tercerMetodo = function (datos) {
  let promise = new Promise(function (resolve, reject) {
    setTimeout(function () {
      console.log("Terminó el tercer método");
      console.log(datos.nuevosDatos); //imprimos los datos concatenados
      resolve("hola");
    }, 3000);
  });
  return promise;
};

// devuelve una promesa como si fuera un fetch
primerMetodo()
  .then((data) => {
    console.log(data);
    return segundoMetodo(data);
  })
  .then((data2) => {
    // throw new Error("Exploto en 2 antes del console log");
    console.log(data2);
  })
  .catch((err) => {
    console.log(err);
  });

// primerMetodo()
//   .then(segundoMetodo)
//   .then(tercerMetodo)
//   .then(function (datos) {
//     console.log(datos); //debería ser el 'hola' que pasamos en tercerMetodo
//   });
