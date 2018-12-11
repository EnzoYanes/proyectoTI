const mongoose = require('mongoose');
const { Schema } = mongoose;

const RecursoSchema = new Schema({
    categoria: String,
    nombre: { type: String, required: true},
    descripcion: String,
    imagen: String,
    tipo: String,
    suscripcion: Number,
    descargable: Boolean,
    archivo: String,
    clientes: [{type: mongoose.Schema.Types.ObjectId, ref:'User'}]
});

module.exports = mongoose.model('recurso', RecursoSchema);