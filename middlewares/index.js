

const validaCampos = require('../middlewares/validar-campos');
const validaJWT = require('../middlewares/validar-jwt');
const validaRoles = require('../middlewares/validarRol');


module.exports = {
   ...validaCampos,
   ...validaJWT,
   ...validaRoles
}