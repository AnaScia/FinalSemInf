const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const gastoSchema = new Schema({
  id: Number,
  descripcion: String,
  monto: Number,
});

module.exports = mongoose.model('gasto', gastoSchema);
