const Rol = require('../models/rol');
const User = require('../models/user');


const roleValidate = async(rol = '') => {

    const thereIsThisRole = await Rol.findOne({ rol });
    if (!thereIsThisRole) {
        throw new Error(`El rol ${ rol } no está registrado en la BD`)
    }
}

//Verificar si el correo existe
const emailValidate = async(email = '') => {
    const thereIsThisEmail = await User.findOne({email});
    
    if (thereIsThisEmail) {
        throw new Error(`El email ${email} ya esta registrado en la BD`)
    }
}

const userIdValidate = async( id ) => {
    const thereIsThisUserId = await User.findById(id);

    if (!thereIsThisUserId) {
        throw new Error(`EL id: ${id} no existe`);
    }
}

module.exports = {
    emailValidate,
    roleValidate,
    userIdValidate
}