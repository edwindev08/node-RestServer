const { Router } = require('express')
const { check } = require('express-validator');
const { 
    crearProducto,
    getProductos,
    getProducto,
    actualizarProducto,
    borrarProducto
 } = require('../controllers/Productos');
const { 
    validarJWT,
    validarCampos,
    isAdminRol, 
    hasRole 
} = require('../middlewares');

const { 
    existeProdID,
    existeCategoriaID,
    existeLabID,
    existePresID 
} = require('../helpers/db-validators');

const router = Router()

// obtener todas las Productos - publico
router.get('/', getProductos )

// Obtener una Producto - publico
router.get('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeProdID ),
    validarCampos
], getProducto)

//Crear Producto - privado - solo con token
router.post('/', [ 
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de Mongo').isMongoId(),
    check('lab', 'No es un id de Mongo').isMongoId(),
    check('presentacion', 'No es un id de Mongo').isMongoId(),
    check('categoria').custom( existeCategoriaID ),
    check('lab').custom( existeLabID ),
    check('presentacion').custom( existePresID ),
    validarCampos
], crearProducto);
    
// Actualizar - con token 
router.put('/:id',[
    validarJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeProdID ),
    hasRole('ADMIN_ROLE','VENTAS_ROLE'),
    validarCampos
], actualizarProducto);

// Eliminar - con token 
router.delete('/:id', [
    validarJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeProdID ),
    isAdminRol,
    validarCampos
], borrarProducto);


module.exports = router