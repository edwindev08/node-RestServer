const { response } = require("express");


// Validar si es administrador
const isAdminRol = (req, res = response, next ) => {

    if( !req.user ) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero'
        });
    }

    const { rol, nombre } = req.user;

    if( rol !== 'ADMIN_ROL' ) {
        return res.status(401).json({
            msg: `${ nombre } no es administrador`
        });
    }

    next();

}
// Validar si tiene algunos de los roles predefinidos
const hasRole = ( ...roles ) => {
    
    return(req, res = response, next) => {

        if( !req.user ) {
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token primero'
            });
        }

        if( !roles.includes(req.user.rol) ) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${ roles }`
            });
        }

        next();
    }
}

module.exports = {
    isAdminRol,
    hasRole
}