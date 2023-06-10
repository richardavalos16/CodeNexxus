// BASE DE DATOS (TABLAS O ESTRUCTURA SIMILAR A UN DB RELACIONAL)

const mongoose = require('mongoose');

const Esquema = mongoose.Schema;
const EsquemaCalificacion = new Esquema({
  videojuego_id: String,
  usuario_id: String,
  calificacion: Number,
});

const Calificacion = mongoose.model('Calificacion', EsquemaCalificacion);
module.exports = Calificacion;
