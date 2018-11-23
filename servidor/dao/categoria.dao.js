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

/**    Categoria.find({req.params.nombre}, {children: {$elemMatch: {nombre: 'Futbol'}}}, (error, categ)=>{
        
        
        var iterator=categ.values();
        for(let i of iterator){
            console.log(i);
            
        }
        
    })
 */

const addChildren = async(req, res)=>{
    const {nombre} = req.body;
    const isLeaf=true;
    const cat=new Categoria({nombre, text:nombre, isLeaf});
    //const name=req.params.nombre;
    /**
     * Se definio que las categorias van a tener dos niveles. Se puede implementar mas niveles pero 
     * hay que meterle mas logica.
     * Asumo que del cliente me envia el _id de la categoria padre para poder buscarlo e agregarlo un hijo.
     *  */   
    
    await Categoria.findOne({nombre:req.params.name}, (error, categoria) => {
        if(categoria){
        /**
         * addToSet inserta un objeto dentro de los hijos del padre.
         * Pero no crea un id, debido a que no se inserta una categoria.
         *  */    
            categoria.children.addToSet(cat);

            categoria.save();
            res.json({message:'Se inserto la categoria'});
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