const jwt = require('jsonwebtoken');
const User = require('../models/user');
const fileUpload = require('express-fileupload')


const confirmar = (req,res) => {
    let id =req.params.id;
    console.log('Paso 0 Existe user id es -> ', id);
    User.findOne({_id: id}, (error, usuario) => {
        if(error) throw error;
        if (usuario) {
            console.log('Paso 1 Existe user');
            if (usuario.confirmacion === 'N'){
                console.log('Paso 2 Lee bien el campo y es "N" ');
                let conf = update(id);
                if(conf === 'S'){
                    console.log('Paso 5 Salio del UPDATE y entro cnof con "S"');
                    return res.json({status: 'Todo ok'})
                }
                else{
                    return res.json({status: 'Algo salio mal al intentar confirmar usuario'})
                }
                
            }else{
                return res.json({status: 'Usuario o contraseña incorrecto'});
            }
        } else {
            return res.json({status: 'Usuario o contraseña incorrecto'});
        }
    })

}

const register = async(req, res) => {
    const { username, password} = req.body;
    User.findOne({username: username}, (error, usuario) => {
        if(error) throw error;
        if (!usuario) {
            console.log("PASO -> 1 <-");
            let confirmacion = "N";
            const user = new User({username, password, confirmacion});
            user.save();
            res.json({ok: true});

            //se consulta nuevamente la base de datos para ver si quedo bien registrado y para sacar el id
            let idconf;
            User.findOne({username: username}, (error, usu) => {
                if (usuario) {
                    console.log("PASO   -> 2 <-");
                    idconf = usu._id;

                    // //envio de email
                    // const nodemailer = require('nodemailer');

                    // // Generate SMTP service account from ethereal.email
                    // nodemailer.createTestAccount((err, account) => {
                    //     if (err) {
                    //         console.error('Failed to create a testing account. ' + err.message);
                    //         return process.exit(1);
                    //     }
            
                    //     console.log('Credentials obtained, sending message...');
            
                    //     // Create a SMTP transporter object
                    //     let transporter = nodemailer.createTransport({
                    //         host: 'smtp.gmail.com', //account.smtp.host,
                    //         port: 587,//account.smtp.port,
                    //         secure: false,//account.smtp.secure,
                    //         auth: {
                    //             user: 'rvalve24@gmail.com',//account.user,
                    //             pass: 'proyecto18'//account.pass
                    //         }
                    //     });
            
                    //     // Message object
                        
                    //     let message = {
                    //         from: 'rvalve24@gmail.com',//'Sender Name <sender@example.com>',
                    //         to: 'richard.valve2497@gmail.com',//'Recipient <recipient@example.com>',
                    //         subject: 'Confirmacion de registro',
                    //         text: 'Hello to myself!',
                    //         html: '<p><b>Hello</b> <a href= "http://localhost:3000/confirmar/?id='+ idconf +'">Presione aqui<a/> '
                    //     };
                    //     console.log("PASO       -> 3 <-");
                    //     transporter.sendMail(message, (err, info) => {
                    //         if (err) {
                    //             console.log('Error occurred. ' + err.message);
                    //             return process.exit(1);
                    //         }
                            
                    //         console.log('Message sent: %s', info.messageId);
                    //         // Preview only available when sending through an Ethereal account
                    //         console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                    //     });
                    // });

                }
                else{
                    return res.json({status: 'El usuario no fue creado'});
                }
            })

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
                return res.json({token: jwt.sign({user: usuario}, 'secret')});
            }else{
                return res.json({status: 'Usuario o contraseña incorrecto'});
            }
        } else {
            return res.json({status: 'Usuario o contraseña incorrecto'});
        }
    })
};

function update(id){
    console.log('Paso 3 Entro al update');
    User.findOne({_id: id}, (error, usuario) => {
        if(error) throw error;
        if (usuario) {
            console.log('Paso 4 Encontro al usu en UPDATE');
            let con = "S";
            const user = new User({username, password, con});
            User.findByIdAndUpdate(id, user);
            return confirmacion;
            }
        else{
            return confirmacion;
            }
        })
}


const updateTask = async(req, res) => {
    const { title, description } = req.body;
    const newTask = {title,description};
    await Task.findByIdAndUpdate(req.params.id, newTask);
    res.json({status: 'Task Updated'});
};


// const upLoad = (req, res) => {
//     //let EDFile = req.files.file
//     let name = req.files.name
//     console.log(name);
//     EDFile.mv(`http://localhost:3000/cliente/public/img/${EDFile.name}`,err => {
//         if(err) return res.status(500).send({ message : err })

//         return res.status(200).send({ message : 'File upload' })
//     })
// }

module.exports = {
    register,
    login,
    confirmar

    //upLoad
};