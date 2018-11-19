const mongoose = require('mongoose'),
Schema = mongoose.Schema,
bcrypt = require('bcryptjs'),
SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    nombre: String,
    apellido: String,
    fechaNac: Date,
    correo: String,
    tipo: String,
    suscripcion: Number,
    nombreEmpresa: String,
    linkEmpresa: String,
    recursos: [{ type : mongoose.Schema.Types.ObjectId, ref: 'recurso' }]
});

UserSchema.pre('save', function(next) {
    var user = this;
    if(!user.isModified('password')) return next();
    user.password = bcrypt.hashSync(user.password, SALT_WORK_FACTOR);
    next();
})

// Este comentario es para el que esta leyendo >>> TE LA COMES DOBLADA <<< JAJAJAJJA

UserSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);