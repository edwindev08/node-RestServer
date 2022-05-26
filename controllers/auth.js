const bcryptjs = require('bcryptjs');
const { response } = require('express'); 
const { generarJWT } = require('../helpers/generar-jwt');
const User = require('../models/user');

const login = async(req, res = response) => {

    const { correo, password } = req.body;

    try {

        // Verificar si el email existe
        const user = await User.findOne({ correo });
        if ( !user ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos'
            });
        }
        // Verificar si usuario esta activo
        if ( !user.estado ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado'
            });
        }

        // Verificar la contraseña
        const valiPass = bcryptjs.compareSync( password, user.password );
        if ( !valiPass ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            })
        }

        // Generar el JWT
        const token = await generarJWT(user.id);

        res.json({
            user,
            token
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json ({
            msg: 'Halgo salió mal hable con admin'
        })
        
    }


}






module.exports = {
    login
}

