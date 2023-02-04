/** 
*   {{url}}/api/uploads
**/

const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');


const { validarCampos, validarArchivoSubir } = require('../middlewares');


const router = Router();

router.post( '/', validarArchivoSubir, cargarArchivo );

router.put( '/:coleccion/:id', 
    [
        validarArchivoSubir,
        check('id', 'El id debe ser de Mongo').isMongoId(),
        check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios', 'productos'] )),
        validarCampos
    ],
    actualizarImagenCloudinary ); //Acá es para hacerlo con Cloudinary
    // actualizarImagen ); // Si se quiere guardar la imagen en el mismo servidor

router.get( '/:coleccion/:id', 
    [
        check('id', 'El id debe ser de Mongo').isMongoId(),
        check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios', 'productos'] )),
        validarCampos
    ],
    mostrarImagen );



module.exports = router
