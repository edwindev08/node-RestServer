const { Router } = require('express')
const { check } = require('express-validator');
const { 
    crearCategoria,
    getCategorias,
    getCategoria,
    actualizarCategoria,
    borrarCategoria
 } = require('../controllers/categorias');
const { validarJWT, validarCampos, isAdminRol } = require('../middlewares');

const { 
    existeCategoriaID 
} = require('../helpers/db-validators');

const router = Router()

// obtener todas las categorias - publico
router.get('/', getCategorias )

// Obtener una categoria - publico
router.get('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeCategoriaID ),
    validarCampos
], getCategoria)

//Crear categoria - privado - solo con token
router.post('/', [ 
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);
    
// Actualizar - con token 
router.put('/:id',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeCategoriaID ),
    //hasRole('ADMIN_ROLE','VENTAS_ROLE'),
    validarCampos
], actualizarCategoria);

// Eliminar - con token 
router.delete('/:id', [
    validarJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeCategoriaID ),
    isAdminRol,
    validarCampos
], borrarCategoria);


module.exports = router