const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validarJWT = async(req = request, res = response, next) => {

    const token = req.header('x-token');

    if( !token ){
        return res.status(401).json({
            msg: 'No envió el token en la petición'
        });
    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
        
        //leer usuario del uid
        const user = await User.findById( uid );

        // Validar si el usuario existe
        if( !user ){
            return res.status(401).json({
                msg: 'Token no valido - user no existe en DB'
            })
        }

         // Verificar si el uid tiene estado true
        if ( !user.estado ){
            return res.status(401).json({
                msg: 'Token no valido - user desactivado'
            })
        }

        req.user = user;    

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }

    

}




module.exports = validarJWT