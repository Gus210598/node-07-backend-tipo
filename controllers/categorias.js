const { response, request } = require("express");

const { Categoria } = require('../models');



// obtenerCaterogias - paginado - total - populate
const obtenerCategorias = async(req = request, res = response ) => {


    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };


    const [ total, categorias ] = await Promise.all([
        Categoria.countDocuments( query ),
        Categoria.find( query )
        .populate('usuario', 'nombre')
        .skip( Number( desde ))
        .limit( Number( limite ))
    ]);

    res.json({
        ok: true,
        msg: 'Muestra los registros de categorias',
        // resp
        total,
        categorias
    })
}

// obtenerCaterogia - populate
const obtenerCategoria = async(req = request, res = response ) => {

    const query = { estado: true};
    const { id } = req.params;
    const categoria = await Categoria.findById( id ).populate('usuario', 'nombre');
       
    res.json({
        ok: true,
        msg: 'Muestra los registros de categorias',
        categoria
    })
}


const CrearCategoria = async( req, res = response ) => {
    
    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await Categoria.findOne({ nombre });

    if ( categoriaDB ) {
        return res.status(400).json({
            msg: `La categoria ${ categoriaDB.nombre } ya existe`
        })
    };

    // Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }
    const categoria = new Categoria( data );

    //Guardar DB
    await categoria.save();
    res.status(201).json({categoria});

}

 
const actualizarCategoria = async(req = request, res = response ) => {

    const { id }= req.params;
    const { estado, usuario, ...data } = req.body;
    data.nombre = data.nombre.toUpperCase();
    // Obtenemos el el id del usuario solicitante o dueño el token
    data.usuario = req.usuario._id;
    
    // Actualiza la BD
    const categoria = await Categoria.findByIdAndUpdate( id, data, { new: true });


    res.json(categoria)
}
  
const borrarCategoria = async(req = request, res = response ) => {

    const { id } = req.params;
   
    const categoriaBorrada = await Categoria.findByIdAndUpdate( id, { estado: false }, { new: true });

    res.json({
        ok: true,
        msg: 'Usuario borrado | delete API',
        categoriaBorrada,

    })
}


module.exports = {
    CrearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria

}
