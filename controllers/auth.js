const { response, json } = require("express");
const bcryptjs = require('bcryptjs');


const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");

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
        console.log('ki wa     Aer');
        console.log(usuario.id);
        // const token = await generarJWT( usuario.id );

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

const googleSignIn = async( req, res = response ) => {

    const { id_token } = req.body;


    try {

        const { correo, nombre, img } = await googleVerify( id_token );
        // console.log( correo, nombre, img );

        let usuario = await Usuario.findOne({ correo });
        if ( !usuario ) {
            const data = {
                nombre,
                correo,
                password: ':p',
                img,
                google: true,
                rol: "USER_ROLE"

            };

            usuario = new Usuario( data );
            // Graba en base de datos
            await usuario.save();
        }
        // Si el usuario figura como eliminado o bloqueado
        if ( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            })
        }

        // Genera JWT
        const token = await generarJWT( usuario.id );

        res.json({
            msg: 'Token google ok',
            usuario,
            token
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        })
    }



}


module.exports = {
    login,
    googleSignIn,

};
