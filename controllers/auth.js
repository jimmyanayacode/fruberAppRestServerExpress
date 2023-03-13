const { response } = require("express");

const bcryptjs = require('bcryptjs');

const User = require("../models/user");
const { generateJWT } = require("../helpers/generate-jwt");


const login = async(req, res=response) => {
    
    const { email, password } = req.body;

    try {    

        //Verificar si el email existe
        const user = await User.findOne({ email });
        if ( !user ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }

        //Si el usuario está activo
        if ( !user.status ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - Estado inactivo'
            })
        }

        //Verficar la contraseña
        const validatePassword = bcryptjs.compareSync( password, user.password);
        if (!validatePassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }

        //Generar el JWT
        const token = await generateJWT(user.id)

        res.json({
            user,
            token
        })

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    login
}
