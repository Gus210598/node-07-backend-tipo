
const Role = require('../models/role');
const { Categoria, Usuario, Producto } = require('../models');



const esRoleValido = async( rol = '' ) => {
    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no esta registrado en la BD`);
    }
}

const emailExiste = async( correo = '' ) => {
    const existeEmail = await Usuario.findOne({ correo });
    if ( existeEmail ) {
            throw new Error(`El correo ${ correo } ya se encuentra registrado`);
        
    }
}

const existeUsuarioPorID = async( id = '' ) => {
    const existeUsuario = await Usuario.findById( id );
    if ( !existeUsuario ) {
            throw new Error(`El id ${ id } no se encuentra registrado`);
        
    }
}

const existeCategoriaPorId = async( id = '' ) => {
    const existeCategoria = await Categoria.findById( id );
    if ( !existeCategoria ) {
            throw new Error(`La categoria ${ id } no se encuentra registrado`);
        
    }
}

const existeProductoPorId = async( id = '' ) => {
    const existeProducto = await Producto.findById( id );
    if ( !existeProducto ) {
            throw new Error(`El producto ${ id } no se encuentra registrado`);
        
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorID,
    existeCategoriaPorId,
    existeProductoPorId
}
