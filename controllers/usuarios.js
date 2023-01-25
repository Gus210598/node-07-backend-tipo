const { response, request } = require=('express');

const usuariosGet = (req = request, res = response ) => {
    // res.send | Levanta un página web
    // res.send('Hello World')

    const { q, nombre= 'No name', apikey } = req.query;

    res.json({
        ok: true,
        msg: 'Hi Jenny get API - controlador',
        q,
        nombre,
        apikey
    })
}

const usuariosPost = (req = request, res = response ) => {

    const { nombre, edad } = req.body;

    res.status(201).json({
        ok: true,
        msg: 'post API - controlador',
        nombre,
        edad
    })
}

const usuariosPut = (req = request, res = response ) => {

    const id = req.params;

    res.status(400).json({
        ok: true,
        msg: 'put API - controlador',
        id
    })
}
  
const usuariosDelete = (req = request, res = response ) => {

    const id = req.params;
    res.json({
        ok: true,
        msg: 'delete API - controlador'
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
