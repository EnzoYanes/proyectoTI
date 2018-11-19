const jwt = require('jsonwebtoken');
const User = require('../models/user');

const register = async(req, res) => {
    const { username, 
        password, 
        nombre, 
        apellido, 
        fechaNac, 
        correo, 
        tipo, 
        suscripcion, 
        nombreEmpresa, 
        linkEmpresa 
    } = req.body;
    User.findOne({username: username}, (error, usuario) => {
        if (!usuario) {
            const user = new User({username, password, nombre, apellido, fechaNac, correo, tipo, suscripcion, nombreEmpresa, linkEmpresa});
            user.save();
            res.json({ok: true});
        } else {
            res.json({status: "Existe otro usuario con mismo nombre"});
        }
    })
    
};

const login = (req, res) => {
    const { username, password} = req.body;
    User.findOne({username: username}, (error, usuario) => {
        if(error) throw error;
        if (usuario) {
            if (usuario.comparePassword(password)){
                //return res.setHeader('Authorization', 'Bearer ' + utils.createToken(usuario));
                return res.json({token: jwt.sign({user: usuario}, 'secret'),
                    user: usuario});
            }else{
                return res.json({status: 'Contraseña incorrecta'});
            }
        } else {
            return res.json({status: 'Usuario incorrecto'});
        }
    })
};

const getUser = async (req,res) => {
    const usuario = await User.findById(req.params.id).populate('recursos');
    res.json(usuario);
};

const putUser = async(req, res) => {
    await User.findByIdAndUpdate(req.params.id, req.body.cliente);
    res.json({message: 'Usuario actualizado'});
};

const addRecursoToUser = async(req, res) => {
    const usuario = await User.findById(req.params.id);
    usuario.recursos.push(req.body.idRecurso);
    usuario.save();
    res.json({message: 'Recurso agregado'});
}

module.exports = {
    register,
    login,
    getUser,
    putUser,
    addRecursoToUser
};