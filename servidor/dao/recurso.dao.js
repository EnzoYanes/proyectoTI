const Recurso = require('../models/recurso');

const getRecursos = async (req, res) => {
    const recurso = await Recurso.find();
    res.json(recurso);
};

const getRecurso = async (req,res) => {
    const recurso = await Recurso.findById(req.params.id);
    res.json(recurso);
};

const addRecurso = async(req, res) => {
    const {idCategoria,
        nombre,
        descripcion,
        imagen,
        tipo,
        suscripcion,
        descargable,
        archivo} = req.body;
    Recurso.findOne({nombre: nombre}, (error, rec) => {
        if (!rec) {
            const recurso = new Recurso({idCategoria,
                nombre,
                descripcion,
                imagen,
                tipo,
                suscripcion,
                descargable,
                archivo});
            recurso.save();
            res.json({ok: true});
        } else {
            res.json({message: 'Existe recurso'});
        }
    })
}

const updateRecurso = async(req, res) => {
    await Recurso.findByIdAndUpdate(req.params.id, req.body.recurso);
    res.json({status: 'Recurso actualizado'});
};

const addCliente = async(req, res) => {
    const recurso = await Recurso.findById(req.params.id);
    recurso.clientes.push(req.body.idUser);
    recurso.save();
    res.json({message: 'Cliente agergado'});
};

module.exports={
    getRecursos,
    getRecurso,
    addRecurso,
    updateRecurso,
    addCliente
};