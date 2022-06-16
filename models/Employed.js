const mongoose = require("mongoose");

const EmployedSchema = mongoose.Schema({
  nombre: {
    type: String,
    require: true,
    trim: true,
  },
  apellidos: {
    type: String,
    require: true,
    trim: true,
  },
  unidad: {
    type: String,
    require: true,
    trim: true,
  },
  codigo: {
    type: String,
    require: true,
    trim: true,
    unique:true
  },
  zona: {
    type: String,
    require: true,
    trim: true,
  },
  password: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
    unique: true,
  }
});

module.exports = mongoose.model("Employed", EmployedSchema);
