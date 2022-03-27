"use strict";
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:
function $Promise(executor) {
  if (typeof executor !== "function")
    throw new TypeError("The executor must be a function"); 
  this._state = "pending";
  this._handlerGroups = []
  executor(this._internalResolve.bind(this), this._internalReject.bind(this));
}

$Promise.prototype._internalResolve = function (value) {
  if (this._state === "pending") {
    this._state = "fulfilled";
    this._value = value; //notese que esta propiedad no se inicializo en la funcion, pero se agrega en el metodo
    this._callHandlers();
  }
};

$Promise.prototype._internalReject = function (reason) {
  if (this._state === 'pending') {
    this._state = "rejected";
    this._value = reason;
    this._callHandlers();
  }
};

$Promise.prototype._callHandlers = function() {
  while(this._handlerGroups.length) {
    const hd = this._handlerGroups.shift();

    if(this._state === 'fulfilled') {
      if(hd.successCb) {
        hd.successCb();
      }
    }
  }
}

$Promise.prototype.then = function(successCb, errorCb) {
  if(typeof successCb !== 'function') successCb = false;
  if(typeof errorCb !== 'function') errorCb = false;
  this._handlerGroups.push({
    successCb: successCb,
    errorCb: errorCb,
  })
  if(this._state !== 'pending') this._callHandlers()
}


module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
