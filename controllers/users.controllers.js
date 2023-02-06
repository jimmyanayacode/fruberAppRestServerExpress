const { response, request } = require('express');

const usersGet = (req=request, res=response) => {

    const {nombre='Sin nombre', apikey} = req.query;

    res.json({
        msg: 'get API - controlador',
        nombre, 
        apikey
    });
}

const userEdit = ( req, res=response) => {

    const id = req.params.id

    res.json({
        msg: 'Edit API - controller',
        id
    });
}

const userPost = ( req, res=response) => {

    const { nombre , edad} = req.body

    res.json({
        msg: 'Request post API -controller',
        nombre,
        edad
    });
}

const userPatch = ( req, res=response) => {
    res.json({
        msg: 'Edit property API -controller'
    })
}

const userDelete = ( req, res=response) => {
    res.json({
        msg: 'Request delete API - controller'
    })
}

module.exports = {
    usersGet,
    userEdit,
    userPatch,
    userPost,
    userDelete
}