/** 
*   {{url}}/api/categorias
**/



const { Router } = require('express');
const { check } = require('express-validator');
const { CrearCategoria, 
        obtenerCategorias, 
        obtenerCategoria, 
        actualizarCategoria, 
        borrarCategoria
} = require('../controllers/categorias');

const { existeCategoriaPorId } = require('../helpers/db-validators');

const { validarCampos, validarJWT, esAdminRole } = require('../middlewares');

const router = Router();


// Obtener todas las categorias - publico
router.get('/', obtenerCategorias);

// Obtener una categoria por id - publico
router.get('/:id',
    [
        check('id', 'No es un id de Mongo válido').isMongoId(),
        check('id').custom( existeCategoriaPorId ),
        validarCampos
    ], 
    obtenerCategoria
)      

// Crear categoria - privado -- cualquier persona con un token válido
router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ], CrearCategoria);

// Actualizar - privado -- cualquier persona con un token válido
router.put('/:id',
    [
        validarJWT,
        check('id', 'No es un id de Mongo válido').isMongoId(),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('id').custom( existeCategoriaPorId ),

        validarCampos
    ], 
    actualizarCategoria)

// Borrar una categoria - privado -- Solo el Admin
router.delete('/:id',
    [
        validarJWT,
        esAdminRole,
        check('id', 'No es un id de Mongo válido').isMongoId(),
        check('id').custom( existeCategoriaPorId ),

        validarCampos
    ],
borrarCategoria)


module.exports = router;
