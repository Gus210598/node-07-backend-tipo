const { response, request } = require('express');

const jwt = require('jsonwebtoken');
const usuario = require('../models/usuario');
const Usuario = require('../models/usuario');


const validarJWT = async( req = request, res = response, next ) => {

    const token = req.header( 'x-token' );

    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }

    try {
        
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        // Leer usuario del uid quien solicita la eliminación // usuario autenticado
       
        const usuario = await Usuario.findById( uid );

        if ( !usuario ) {
            return res.status( 401 ).json({
                msg: 'Token no valido -- usuario no existe en DB'
            })
        }

        // Verificar si uid tiene estado en true
        if ( !usuario.estado ) {
            return res.status( 401 ).json({
                msg: 'Token no valido -- usuario estado: false'
            })
        }

        req.usuario = usuario;
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'token no valido'
        })
    }


}


module.exports = {
    validarJWT,

}
