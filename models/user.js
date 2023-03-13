const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name:{
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },

    email:{
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },

    password:{
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },

    img: {
        type: String,
    },

    rol:{
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },

    status: {
        type: Boolean,
        default: true
    },

    google: {
        type: Boolean,
        default: false
    },
});

//Configuramos la respuesta para no enviar __V y el password
UserSchema.methods.toJSON = function(){
    const { __v, password, _id, ...users } = this.toObject();
    users.uid = _id;
    return users;
}

module.exports = model('Users', UserSchema);