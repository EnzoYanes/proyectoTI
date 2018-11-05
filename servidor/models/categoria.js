const mongoose = require('mongoose');
const { Schema } = mongoose;

const CategoriaSchema = new Schema({
    nombre: { type: String, required: true},
    idPadre: String
});

module.exports = mongoose.model('categoria', CategoriaSchema);