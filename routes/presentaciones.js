const { Router } = require('express')
const { check } = require('express-validator');
const { 
    crearPresentacion,
    getPresentaciones,
    getPresentacion,
    actualizarPresentacion,
    borrarPresentacion
 } = require('../controllers/presentaciones');
const { validarJWT, validarCampos, isAdminRol, } = require('../middlewares');

const { 
    existePresID 
} = require('../helpers/db-validators');

const router = Router()

// obtener todas las Presentacions - publico
router.get('/', getPresentaciones );

// Obtener una Presentacion - publico
router.get('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existePresID ),
    validarCampos,
], getPresentacion);

//Crear Presentacion - privado - solo con token
router.post('/', [ 
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearPresentacion);
    
// Actualizar - con token 
router.put('/:id',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existePresID ),
    //hasRole('ADMIN_ROLE','VENTAS_ROLE'),
    validarCampos
], actualizarPresentacion);

// Eliminar - con token 
router.delete('/:id', [
    validarJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existePresID ),
    isAdminRol,
    validarCampos
], borrarPresentacion);


module.exports = router;