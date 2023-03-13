const { response } = require("express");

const isAdminRole = ( req, res = response, next ) => {
    
    if (!req.userAuth) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        });
    }

    const { rol, name } = req.userAuth;

    if ( rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${ name } no es administrador - No puede hacer esto`
        })
    }

    next();
}

const hasRole = ( ...rols ) => {
    return (req, res=response, next) =>     {

        if ( !req.userAuth) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            });
        }

        if ( !rols.includes( req.userAuth.rol ) ) {
            return res.status(401).json({
                msg: `El servicio require uno de estos roles ${ rols }`
            });
        }

        next();

    }
}

module.exports = {
    hasRole,
    isAdminRole
}