

const dbValidators = require('./db-validators');
const geberaJWT = require('./generar-jwt');
const googleVerify = require('./google-verify');
const subirArchivo = require('./subir-archivo');

module.exports = {
    ...dbValidators,
    ...geberaJWT,
    ...googleVerify,
    ...subirArchivo,
}
