const { response, request } = require('express');
const bcryptjs = require('bcryptjs'); 

const Usuario = require('../models/usuario');

const usuariosGet = async(req = request, res = response ) => {
    // res.send | Levanta un página web
    // res.send('Hello World')

    // const { q, nombre= 'No name', apikey } = req.query;

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true};

    // Estas 2 promesas se unen en una sola como es el resp
    // const usuarios = await await Usuario.find( query )
    //     .skip( Number( desde ))
    //     .limit( Number( limite ));
    // const total = await Usuario.countDocuments( query );

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments( query ),
        Usuario.find( query )
        .skip( Number( desde ))
        .limit( Number( limite ))
    ]);

    res.json({
        ok: true,
        msg: 'Muestra los registros | Hi Jenny get API - controlador',
        // resp
        total,
        usuarios
    })
}

const usuariosPost = async(req = request, res = response ) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

  
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
    await usuario.save();

    res.status(201).json({
        ok: true,
        msg: 'Usuario creado | post API - controlador',
        usuario
    })
}

const usuariosPut = async(req = request, res = response ) => {

    const { id }= req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    // TODO Validar contra la base de datos
    if ( password ) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    // Actualiza la BD
    const usuario = await Usuario.findByIdAndUpdate( id, resto );


    res.status(400).json({
        ok: true,
        msg: 'Usuario modifcado | put API - controlador',
        usuario
    })
}
  
const usuariosDelete = async(req = request, res = response ) => {

    const { id } = req.params;

    // Fisicamente se borra
    // const usuario = await Usuario.findByIdAndDelete( id );

    // Para evitar borrarlo fisicamente vamos a cambiar el estado
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false });

    res.json({
        ok: true,
        msg: 'Usuario borrado | delete API',
        id
    })
}
   
const usuariosPatch = (req = request, res = response ) => {
    
    res.json({
        ok: true,
        msg: 'patch API - controlador'
    })
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}
