const Suscripcion = require('../models/suscripcion');

const getSuscripciones = async (req, res) => {
    const suscripciones = await Suscripcion.find();
    res.json(suscripciones);
};

const getSuscripcion = async (req,res) => {
    const suscription = await Suscripcion.findById(req.params.id);
    res.json(suscription);
};

const addSuscripcion = async(req, res) => {
    const {_id, nombre, precio} = req.body.item;
    const suscripcion = new Suscripcion({_id, nombre, precio});
    await suscripcion.save();
    res.json({status: 'Suscription Saved'});
}

const updateSuscripcion = async(req, res) => {
    await Suscripcion.findByIdAndUpdate(req.params.id, req.body);
    res.json({status: 'Suscription Updated'});
};

module.exports={
    getSuscripciones,
    getSuscripcion,
    addSuscripcion,
    updateSuscripcion
};