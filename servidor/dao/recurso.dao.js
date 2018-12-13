const Recurso = require('../models/recurso');
const fileUpload = require('express-fileupload');
const User = require('../models/user');


const getRecursos = async (req, res) => {
    const recurso = await Recurso.find();
    res.json(recurso);
};

const getRecurso = async (req,res) => {
    const recurso = await Recurso.findById(req.params.id).populate('clientes');
    res.json(recurso);
};

const addRecurso = async(req, res) => {
    const {categoria,
        nombre,
        descripcion,
        imagen,
        tipo,
        suscripcion,
        descargable,
        archivo,
        idUser} = req.body;
    Recurso.findOne({nombre: nombre}, (error, rec) => {
        if (!rec) {
            const recurso = new Recurso({categoria,
                nombre,
                descripcion,
                imagen,
                tipo,
                suscripcion,
                descargable,
                archivo});
                recurso.save();
        
            User.findOne({_id: idUser}, (error, usuario) => {
                if(error) throw error;
                if (usuario) {
                    usuario.recursos.push(recurso.id);
                    usuario.save();
                    res.json({ok: true});
            }})
           
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

const upload = (req,res) => {
    let EDFile = req.files.file;
    EDFile.mv(`../cliente/public/img/${EDFile.name}`,err => {
        if(err) return res.status(500).send({ message : err })

        return res.status(200).send({ message : 'File upload' })
    })
};

module.exports={
    getRecursos,
    getRecurso,
    addRecurso,
    updateRecurso,
    addCliente,
    upload
};