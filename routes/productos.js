/** 
*   {{url}}/api/productos
**/


const { Router } = require('express');
const { check } = require('express-validator');
const { CrearProducto, 
        obtenerProductos, 
        obtenerProducto, 
        actualizarProducto, 
        borrarProducto
} = require('../controllers/productos');

const { existeProductoPorId, existeCategoriaPorId } = require('../helpers/db-validators');

const { validarCampos, validarJWT, esAdminRole } = require('../middlewares');

const router = Router();


// Obtener todas las productos - publico
router.get('/', obtenerProductos);

// Obtener una producto por id - publico
router.get('/:id',
    [
        check('id', 'No es un id de Mongo válido').isMongoId(),
        check('id').custom( existeProductoPorId ),
        validarCampos
    ], 
    obtenerProducto
)      

// Crear producto - privado -- cualquier persona con un token válido
router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('categoria', 'No es un id de Mongo válido').isMongoId(),
        check('categoria', 'La categoria es obligatorio').not().isEmpty(),
        check('categoria').custom( existeCategoriaPorId ),

        validarCampos
    ], CrearProducto);

// Actualizar - privado -- cualquier persona con un token válido
router.put('/:id',
    [
        validarJWT,
        // check('categoria', 'No es un id de Mongo válido').isMongoId(),
        check('id').custom( existeProductoPorId ),

        validarCampos
    ], 
    actualizarProducto)

// Borrar una producto - privado -- Solo el Admin
router.delete('/:id',
    [
        validarJWT,
        esAdminRole,
        check('id', 'No es un id de Mongo válido').isMongoId(),
        check('id').custom( existeProductoPorId ),

        validarCampos
    ],
borrarProducto)


module.exports = router;
