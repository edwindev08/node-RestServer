const { Router } = require('express')
const { check } = require('express-validator');
const { 
    crearLaboratorio,
    getLaboratorios,
    getLaboratorio,
    actualizarLaboratorio,
    borrarLaboratorio
 } = require('../controllers/laboratorios');
const { 
    validarJWT, 
    validarCampos, 
    isAdminRol  
} = require('../middlewares');
//const { validarCampos } = require('../middlewares/validar-campos');

const { 
    existeLabID 
} = require('../helpers/db-validators');

const router = Router()

// obtener todas las Laboratorios - publico
router.get('/', getLaboratorios );

// Obtener una Laboratorio - publico
router.get('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeLabID ),
    validarCampos,
], getLaboratorio);

//Crear Laboratorio - privado - solo con token
router.post('/', [ 
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearLaboratorio);
    
// Actualizar - con token 
router.put('/:id',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeLabID ),
    //hasRole('ADMIN_ROLE','VENTAS_ROLE'),
    validarCampos
], actualizarLaboratorio);

// Eliminar - con token 
router.delete('/:id', [
    validarJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeLabID ),
    isAdminRol,
    validarCampos
], borrarLaboratorio);


module.exports = router;