const { response } = require("express");


const esAdminRole = ( req, res = response, next ) => {

    if ( !req.usuario ) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        })
    }

    const { rol, nombre } = req.usuario;
    if ( rol !== 'ADMIN_ROLE' ){
        return res.status(401).json({
            msg: `${ nombre } no es administrador -- No puede hacer esto `
        })
    }

    next();
}

const tieneRole = ( ...roles ) => {

    
    return ( req, res= response, next ) => {

        if ( !req.usuario ) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            })
        }

        console.log(roles);
        console.log(req.usuario.rol);

        if ( !roles.includes( req.usuario.rol )) {
            return res.status(401).json({
                msg: `el servicio requiere uno de estos roles ${ roles }`
            })
        }

        next();
    }



}

module.exports = {
    esAdminRole,
    tieneRole,

}