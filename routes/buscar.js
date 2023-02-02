/** 
*   {{url}}/api/buscar
**/

const { Router } = require('express');
const { buscar } = require('../controllers/buscar');
// const { check } = require('express-validator');


// const { login, googleSignIn } = require('../controllers/auth');
// const { validarCampos } = require('../middlewares/validar-campos');



const router = Router();

router.get('/:coleccion/:termino', 
    [
        // check('id_token', 'Token de google es necesario').not().isEmpty(),
        // validarCampos
    ],
    buscar );


module.exports = router
