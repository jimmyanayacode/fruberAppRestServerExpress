const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const usersGet = async(req=request, res=response) => {

    const { limit = 5, since = 0 } = req.query;

    const [ countUser, users] = await Promise.all([
        User.countDocuments( {status: true}),
        User.find( {status: true} )
            .skip( Number( since ))
            .limit( Number( limit ))
    ]);

    res.json({
        countUser,
        users
    });
}

const userEdit = async( req, res=response ) => {

    const { id } = req.params;
    const { _id, google, correo, ...dataForUpdate} = req.body;

    if ( dataForUpdate.password ) {
        //Encirptar contraseña
        const salt = bcryptjs.genSaltSync();
        dataForUpdate.password = bcryptjs.hashSync( dataForUpdate.password, salt);
    }

    const user = await User.findByIdAndUpdate( id, dataForUpdate);

    res.json({
        msg: 'Edit API - controller',
        user
    });
}

const userPost = async( req, res=response) => {

    const { name, email, password, rol }= req.body
    const createUser = new User({name, email, password, rol});

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    createUser.password = bcryptjs.hashSync( password, salt);

    await createUser.save()

    res.json({
        msg: 'User created in BD',
        createUser
    });
}

const userPatch = ( req, res=response) => {
    res.json({
        msg: 'Edit property API -controller'
    })
}

const userDelete = async( req, res=response) => {

    const { id } = req.params;
    const { userAuth } = req

    const user = await User.findByIdAndUpdate( id, {status:false} );
    res.json({
        user,
        userAuth
    })
}

module.exports = {
    usersGet,
    userEdit,
    userPatch,
    userPost,
    userDelete
}