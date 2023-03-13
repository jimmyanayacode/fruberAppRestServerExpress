const { response, request } = require("express");
const jwt = require('jsonwebtoken');
const User = require("../models/user");

const jwtValidate = async( req=request, res=response, next ) => {
    
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
    
        const { uid } = jwt.verify( token, process.env.SECRETPRIVATEKEY);

        //Leer el usuario que corresponde al uid
        const user = await User.findById( uid ); 

        if ( !user ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe BD'
            })
        }

        //Verificar si el uid tiene estado true
        if ( !user.status ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado: false'
            })
        }

        req.userAuth = user;
        req.uid = uid;

        console.log(req.userAuth)
        
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }

}

module.exports = {
    jwtValidate
}