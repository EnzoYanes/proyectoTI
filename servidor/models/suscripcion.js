const mongoose = require('mongoose');
const { Schema } = mongoose;

const SuscripcionSchema = new Schema({
    _id: Number,
    nombre: { type: String, required: true},
    precio: { type: Number, required: true}
});

module.exports = mongoose.model('suscripcion', SuscripcionSchema);