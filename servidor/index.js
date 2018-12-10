import express from 'express';
import jwt from 'express-jwt';
import cors from 'cors';
import jwks from 'jwks-rsa';
const { mongoose } = require('./database');
import jwtAuthz from 'express-jwt-authz';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';

// crear servidor
const app = express();

// configurar el servidor para json
app.use(bodyParser.json() );
app.use(bodyParser.urlencoded({ extended: true } ));
app.use(fileUpload());

app.use( cors() );

//  web token valido
const jwtCheck = jwt({
    secret: 'secret'
});

// revisamos y validamos los scopes
const checkScopes = jwtAuthz(['read:articulos']);

// Routas
app.use('/api/tasks', require('./routes/task.routes'));
app.use('/api/user', require('./routes/user.routes'));
app.use('/api/categoria', require('./routes/categoria.routes'));

app.get('/articulos', /*jwtCheck, checkScopes, */ (req, res) => {
     let articulos =[
        
            // {
            //   id: 100,
            //   text: 'Fruits',
            //   children: [
            //     {
            //       id: 101,
            //       text: 'Orange',
            //       isLeaf: true
            //     },
            //     {
            //       id: 102,
            //       text: 'Banana',
            //       isLeaf: true
            //     }
            //   ]
            // },
            // {
            //   id: 200,
            //   text: 'Vegetables',
            //   children: [
            //     {
            //       id: 201,
            //       text: 'Carrot',
            //       isLeaf: true
            //     },
            //     {
            //       id: 202,
            //       text: 'Tomato',
            //       isLeaf: true
            //     }
            //   ]
            // }
            
        {
            id:100, 
            text:"camisetas",
            children:[
            {
                id : 101,
                text: 'camisa',
                isLeaf:true,
                "nombre" : "HTML5",
                "precio" : 25,
                "imagen" : "camisa_1",
                "descripcion": "Mauris eu mi vitae dui imperdiet finibus id id orci. Morbi iaculis blandit augue rutrum laoreet. Etiam maximus bibendum nisi id tincidunt. Donec laoreet purus eleifend, semper urna quis, auctor felis. Etiam ultricies quis urna sed porttitor. Praesent sit amet dolor orci. Nam lacus purus, varius sit amet enim vitae, lobortis auctor diam. Morbi in tempor arcu. Aliquam efficitur lacus in ante viverra dapibus."
            },
            {
                id : 102,
                text: "camisa",
                isLeaf:true,
                "nombre" : "CSS3",
                "precio" : 25,
                "imagen" : "camisa_2",
                "descripcion": "Mauris eu mi vitae dui imperdiet finibus id id orci. Morbi iaculis blandit augue rutrum laoreet. Etiam maximus bibendum nisi id tincidunt. Donec laoreet purus eleifend, semper urna quis, auctor felis. Etiam ultricies quis urna sed porttitor. Praesent sit amet dolor orci. Nam lacus purus, varius sit amet enim vitae, lobortis auctor diam. Morbi in tempor arcu. Aliquam efficitur lacus in ante viverra dapibus."
            },
            {
                id : 103,
                text: "camisa_3",
                isLeaf:true,
                "nombre" : "NodeJS",
                "precio" : 30,
                "imagen" : "camisa_3",
                "descripcion": "Mauris eu mi vitae dui imperdiet finibus id id orci. Morbi iaculis blandit augue rutrum laoreet. Etiam maximus bibendum nisi id tincidunt. Donec laoreet purus eleifend, semper urna quis, auctor felis. Etiam ultricies quis urna sed porttitor. Praesent sit amet dolor orci. Nam lacus purus, varius sit amet enim vitae, lobortis auctor diam. Morbi in tempor arcu. Aliquam efficitur lacus in ante viverra dapibus."
            },
            {
                id : 104,
                text: "camisa_4",
                isLeaf:true,
                "nombre" : "JavaScript",
                "precio" : 25,
                "imagen" : "camisa_4",
                "descripcion": "Mauris eu mi vitae dui imperdiet finibus id id orci. Morbi iaculis blandit augue rutrum laoreet. Etiam maximus bibendum nisi id tincidunt. Donec laoreet purus eleifend, semper urna quis, auctor felis. Etiam ultricies quis urna sed porttitor. Praesent sit amet dolor orci. Nam lacus purus, varius sit amet enim vitae, lobortis auctor diam. Morbi in tempor arcu. Aliquam efficitur lacus in ante viverra dapibus."
            }
        ]
    },
    { 
        id:200,
        text:'remeras',
        children:[ 
            {
                id : 201,
                text: "camisa_5",
                isLeaf:true,
                "nombre" : "Angular",
                "precio" : 20,
                "imagen" : "camisa_5",
                "descripcion": "Mauris eu mi vitae dui imperdiet finibus id id orci. Morbi iaculis blandit augue rutrum laoreet. Etiam maximus bibendum nisi id tincidunt. Donec laoreet purus eleifend, semper urna quis, auctor felis. Etiam ultricies quis urna sed porttitor. Praesent sit amet dolor orci. Nam lacus purus, varius sit amet enim vitae, lobortis auctor diam. Morbi in tempor arcu. Aliquam efficitur lacus in ante viverra dapibus."
            },
            {
                id : 202,
                text: "camisa_6",
                isLeaf:true,
                "nombre" : "Github",
                "precio" : 20,
                "imagen" : "camisa_6",
                "descripcion": "Mauris eu mi vitae dui imperdiet finibus id id orci. Morbi iaculis blandit augue rutrum laoreet. Etiam maximus bibendum nisi id tincidunt. Donec laoreet purus eleifend, semper urna quis, auctor felis. Etiam ultricies quis urna sed porttitor. Praesent sit amet dolor orci. Nam lacus purus, varius sit amet enim vitae, lobortis auctor diam. Morbi in tempor arcu. Aliquam efficitur lacus in ante viverra dapibus."
            },
            {
                id : 203,
                text: "camisa_7",
                isLeaf:true,
                "nombre" : "WordPress",
                "precio" : 25,
                "imagen" : "camisa_7",
                "descripcion": "Mauris eu mi vitae dui imperdiet finibus id id orci. Morbi iaculis blandit augue rutrum laoreet. Etiam maximus bibendum nisi id tincidunt. Donec laoreet purus eleifend, semper urna quis, auctor felis. Etiam ultricies quis urna sed porttitor. Praesent sit amet dolor orci. Nam lacus purus, varius sit amet enim vitae, lobortis auctor diam. Morbi in tempor arcu. Aliquam efficitur lacus in ante viverra dapibus."
            },
            {
                id : 204,
                text: "camisa_8",
                isLeaf:true, 
                children:[
                    {
                        isLeaf:true,
                        "nombre" : "React",
                        "precio" : 20,
                        "imagen" : "camisa_8",
                        text: "Mauris eu mi vitae dui imperdiet finibus id id orci. Morbi iaculis blandit augue rutrum laoreet. Etiam maximus bibendum nisi id tincidunt. Donec laoreet purus eleifend, semper urna quis, auctor felis. Etiam ultricies quis urna sed porttitor. Praesent sit amet dolor orci. Nam lacus purus, varius sit amet enim vitae, lobortis auctor diam. Morbi in tempor arcu. Aliquam efficitur lacus in ante viverra dapibus."
                    }   
                ]
                
            }
        ]
    }
]
      

      res.json(articulos);
     
});

app.use('/api/suscripcion', require('./routes/suscripcion.routes'));
app.use('/api/recurso', require('./routes/recurso.routes'));


app.listen(5000, () => {
     console.log('Servidor funcionando');
})