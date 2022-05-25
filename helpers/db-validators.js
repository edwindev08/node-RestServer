const Role = require("../models/role");
const User = require("../models/users");


const esRolValido = async(rol = '') => {

    const existeRole = await Role.findOne({rol});
    if(!existeRole) {
        throw new Error(`El rol ${rol} no està en la base de datos`)
    }
}

// V erificar si el correo existe
const emailExiste = async(correo = '') => {

    const emailExist = await User.findOne({ correo })
    if ( emailExist ) {
        throw new Error(`El correo: ${correo} ya esta registrado`)
    }
}

// V erificar si el correo existe
const existeID = async( id ) => {

    const existeUser = await User.findById( id )
    if ( !existeUser ) {
        throw new Error(`El id no existe: ${id}`)
    }
}



module.exports = {
    esRolValido,
    emailExiste,
    existeID
}