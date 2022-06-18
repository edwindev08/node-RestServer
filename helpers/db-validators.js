const { response, request } = require('express')
const { 
    Categoria,
    Laboratorio, 
    Presentacion,
    Role, 
    User,
    Producto
} = require("../models");



const esRolValido = async(req, res= response) => {
    const { rol } = req.body
    console.log(rol)
    const existeRole = await Role.findOne({rol});
    if(!existeRole) {
        //throw new Error(`El rol ${rol} no está en la base de datos`)
        return res.status(400).json({
            ok: false,
            msg: `El rol ${ rol } no es valido`
        });
    }
}



// V erificar si el correo existe
const emailExiste = async(correo='', req, res = response) => {

    //const { correo } = req.body

    const emailExist = await User.findOne({correo})

    if ( emailExist ) {
        throw new Error(`El correo ${ correo } ya existe`)
        // return res.status(400).json({            
        //     ok: false,
        //     msg: `El correo ${ correo } ya existe`
        // });
    }
}

// Verificar si el correo existe
const existeUserID = async( id ) => {

    const existeUser = await User.findById( id )
    if ( !existeUser ) {
        throw new Error(`El id no existe: ${id}`)
    }
}

// validar si una categoria existe

const existeCategoriaID = async(id) => {

    const existeCat = await Categoria.findById( id )
    if(!existeCat) {
        throw new Error(`La categoria no existe: ${id}`)
    }
}
// validar si una categoria existe

const existeProdID = async(id) => {

    const existePrd = await Producto.findById( id )
    if(!existePrd) {
        throw new Error(`El producto no existe: ${id}`)
    }
}

// validar si un lab existe
const existeLabID = async(id) => {

    const existeLab = await Laboratorio.findById( id )
    if(!existeLab) {
        throw new Error(`El laboratorio no existe: ${id}`)
    }
}
// validar si unpresentación existe
const existePresID = async(id) => {

    const existePres = await Presentacion.findById( id )
    if(!existePres) {
        throw new Error(`La presentación no existe: ${id}`)
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUserID,
    existeCategoriaID,
    existeLabID,
    existePresID,
    existeProdID
    
}