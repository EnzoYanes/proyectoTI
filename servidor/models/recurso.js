const mongoose = require('mongoose');
const { Schema } = mongoose;

const RecursoSchema = new Schema({
    idCategoria: String,
    nombre: { type: String, required: true},
    descripcion: String,
    imagen: String,
    tipo: String,
    suscripcionReq: String,
    descargable: Boolean,
    archivo: String
});

module.exports = mongoose.model('recurso', RecursoSchema);