const Categoria = require('../models/categoria');

const getCategorias = async (req, res) => {
    const categorias = await Categoria.find();
    res.json(categorias);
};

const addCategoria = async(req, res) => {
    const {nombre, idPadre} = req.body;
    Categoria.findOne({nombre: nombre}, (error, categoria) => {
        if (!categoria) {
            const categoria = new Categoria({nombre, idPadre});
            categoria.save();
            res.json({ok: true});
        } else {
            res.json({message: 'Existe categoria'});
        }
    })
}

module.exports={
    getCategorias,
    addCategoria
};