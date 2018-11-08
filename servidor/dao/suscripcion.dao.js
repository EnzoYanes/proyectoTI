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
    const {nombre, precio} = req.body;
    const suscripcion = new Suscripcion({nombre, precio});
    await suscripcion.save();
    res.json({status: 'Suscription Saved'});
}

const updateSuscripcion = async(req, res) => {
    const { nombre, precio } = req.body;
    const newSuscripcion = {nombre, precio};
    await Suscripcion.findByIdAndUpdate(req.params.id, newSuscripcion);
    res.json({status: 'Suscription Updated'});
};

module.exports={
    getSuscripciones,
    getSuscripcion,
    addSuscripcion,
    updateSuscripcion
};