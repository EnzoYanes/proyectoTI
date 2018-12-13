const Categoria = require('../models/categoria');
;

const getCategorias = async (req, res) => {
    const categorias = await Categoria.find();
    res.json(categorias);
};

const addCategoria = async(req, res) => {
    const {nombre} = req.body;
    Categoria.findOne({nombre: nombre}, (error, categoria) => {
        if (!categoria) {
            const categoria = new Categoria({nombre,  text:nombre, isLeaf:true});
            categoria.save(); 
            res.json({ok: true});
        } else {
            res.json({message: 'Existe categoria'});
        }
    })
    
}

const addChildren = async(req, res)=>{
    const {nombre} = req.body;
    const isLeaf=true;
    const cat=new Categoria({nombre, text:nombre, isLeaf});
    
    await Categoria.findOne({nombre:req.params.name}, (error, categoria) => {
        if(categoria){ 
            categoria.children.addToSet(cat);
            categoria.save();
            res.json({ok: true});
        }else{
            res.json({message: 'Existe este hijo'});
        }
    })  
}

const findCategoriaById = async (req, res) => {
    const categoria = await Categoria.findById(req.params.id);
    res.json(categoria);
}

module.exports={
    getCategorias,
    addCategoria, 
    addChildren,
    findCategoriaById
};