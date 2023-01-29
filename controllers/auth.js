const { response } = require("express");
const bcryptjs = require('bcryptjs');


const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generar-jwt");

const login = async( req, res = response ) => {

    const { correo, password } = req.body;
    
    try {
        // Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if ( !usuario ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos ---correo'
            })
        }

        // Si usuario activo
        if ( !usuario.estado ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos --- estado: false'
            })
        }

        // Verificar contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if ( !validPassword ) {
            return res.status(404).json({
                msg: 'Usuario / Password no son correctos --- password'
            })
        }
        // Genera JWT
        const token = await generarJWT( usuario.id );

        res.json({
            ok: 'ok',
            msg: 'token generado',
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrdor"
        })
    }

   

}

module.exports = {
    login,

};
