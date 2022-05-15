const mongoose = require("mongoose");

const EmployedSchema = mongoose.Schema({
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
  }
});

module.exports = mongoose.model("Employed", EmployedSchema);
