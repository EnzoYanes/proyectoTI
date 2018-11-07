import express from 'express';
import jwt from 'express-jwt';
import cors from 'cors';
import jwks from 'jwks-rsa';
const { mongoose } = require('./database');
import jwtAuthz from 'express-jwt-authz';
import bodyParser from 'body-parser';

// crear servidor
const app = express();

// configurar el servidor para json
app.use(bodyParser.json() );
app.use(bodyParser.urlencoded({ extended: true } ));

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
app.use('/api/suscripcion', require('./routes/suscripcion.routes'));
app.use('/api/recurso', require('./routes/recurso.routes'));

app.listen(5000, () => {
     console.log('Servidor funcionando');
})