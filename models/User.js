const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
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
  direccion: {
    type: String,
    require: true,
    trim: true,
  },
  dni: {
    type: String,
    require: true,
    trim: true,
    unique:true
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
  },
  registro: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("User", UserSchema);
