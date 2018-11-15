const mongoose = require('mongoose');
const { Schema } = mongoose;

const CategoriaSchema = new Schema({
    _id: {type: Number, required: true},
    
    text:{type: String, required: false},
    isLeaf:{type: Boolean, required: true},
    nombre: { type: String, required: true},
    idPadre: String,
    children:{type:Array, required:false}

});

module.exports = mongoose.model('categoria', CategoriaSchema);