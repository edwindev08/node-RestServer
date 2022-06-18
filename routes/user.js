
const { Router } = require('express')
const { check } = require('express-validator')

const {
    validarCampos,
    validarJWT,
    isAdminRol
} = require('../middlewares');

const { 
    esRolValido, 
    emailExiste, 
    existeUserID, 
} = require('../helpers/db-validators');

const { 
    getUsers, 
    postUser, 
    putUser,
    patchUser,
    deleteUser
} = require('../controllers/users');

const router = Router()

router.get('/', getUsers)

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener mas de 4 caracteres').isLength({ min:4 }),
    //check('correo').custom( emailExiste ),
    //check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    //check('rol').custom( esRolValido ),
    validarCampos
], postUser )

router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeUserID ),
    check('rol').custom( esRolValido ),
    validarCampos
], putUser)

router.delete('/:id',[
    validarJWT,
    isAdminRol,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeUserID ),
    validarCampos
], deleteUser )
router.patch('/', patchUser )


module.exports = router;