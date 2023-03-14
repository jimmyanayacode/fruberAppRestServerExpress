const { response, json } = require("express");

const bcryptjs = require('bcryptjs');

const User = require("../models/user");
const { generateJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");


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


const googleSignIn = async( req, res=response ) => {

    const { id_token } = req.body;

    try {

        const { email, name, img } = await googleVerify( id_token );

        let user = await User.findOne({email});

        if ( !user ) {    
            //Crear nuevo usuario        
            const dataNewUser = {
                name,
                email,
                password: '',
                img,
                google: true
            };

            user = new User( dataNewUser );
            await user.save();
        } 

        // Si  el usuario en BD tiene status (false)
        if ( !user.status ) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario inactivo'
            });
        }

        //Generar el JWT
        const token = await generateJWT(user.id); 

        res.json({
            user,
            token
        });
        
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        })
    }

}

module.exports = {
    googleSignIn,
    login
}
