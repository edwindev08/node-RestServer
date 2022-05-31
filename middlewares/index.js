const validarCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');
const {isAdminRol, hasRole} = require('../middlewares/validarRol');


module.exports = {
   validarCampos,
   validarJWT,
   isAdminRol,
   hasRole
}