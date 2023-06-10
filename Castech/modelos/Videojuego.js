// BASE DE DATOS (TABLAS O ESTRUCTURA SIMILAR A UN DB RELACIONAL)

const mongoose = require('mongoose');

const Esquema = mongoose.Schema;

const EsquemaVideojuego = new Esquema({
  nombre: String,
  descripcion: String,
  genero: String,
  desarrolladora: String,
});

const Videjuego = mongoose.model('Videjuego', EsquemaVideojuego);
module.exports = Videjuego;
