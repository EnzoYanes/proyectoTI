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

const sendMail  = () => {

        //envio de email
        const nodemailer = require('nodemailer');
        const smtpTransport = require('nodemailer-smtp-transport');
        // Generate SMTP service account from ethereal.email
        nodemailer.createTestAccount((err, account) => {
            if (err) {
                console.error('Failed to create a testing account. ' + err.message);
                return process.exit(1);
            }

            console.log('Credentials obtained, sending message...');

            // Create a SMTP transporter object
            let transporter = nodemailer.createTransport(smtpTransport({
                host: 'smtp.gmail.com', //account.smtp.host,
                port: 587,//account.smtp.port,
                secure: false,//account.smtp.secure,
                auth: {
                    user: 'rvalve24@gmail.com',//account.user,
                    pass: 'proyecto2018'//account.pass
                },
                tls: { rejectUnauthorized: false }
            }));

            // Message object
            
            let message = {
                from: 'rvalve24@gmail.com',//'Sender Name <sender@example.com>',
                to: 'richard.valve2497@gmail.com',//'Recipient <recipient@example.com>',
                subject: 'Equipo administrativo',
                //text: 'Hello to myself!',
                html: '<p><b>Se ha iniciado sesion correctamente </b>  '
            };
        
            transporter.sendMail(message, (err, info) => {
                if (err) {
                    console.log('Error occurred. ' + err.message);
                    return process.exit(1);
                }
                
                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            });
        });
}

const login = (req, res) => {
    const { username, password} = req.body;
    User.findOne({username: username}, (error, usuario) => {
        if(error) throw error;
        if (usuario) {
            if (usuario.comparePassword(password)){
                //return res.setHeader('Authorization', 'Bearer ' + utils.createToken(usuario));
                //sendMail();
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
    addRecursoToUser,
};