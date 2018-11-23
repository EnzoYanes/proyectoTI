const mongoose = require('mongoose');
const { Schema } = mongoose;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const CategoriaSchema = new Schema({
    _id: Number,
    text:{type: String, required: false},
    isLeaf:{type: Boolean, required: true},
    nombre: { type: String, required: true},
    //idPadre: String,
    children:{type:Array}

}, {_id:false});
CategoriaSchema.plugin(AutoIncrement);

module.exports = mongoose.model('categoria', CategoriaSchema);