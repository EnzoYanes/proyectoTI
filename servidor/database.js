const mongoose = require('mongoose');


const URI = 'mongodb://localhost/proydb';
var con=mongoose.connect(URI)
    .then(dp => console.log('DB is connected'))
    .catch(err => console.error(err));




module.exports = mongoose;