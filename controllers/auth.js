const bcryptjs = require('bcryptjs');
const { response } = require('express'); 

const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');
const User = require('../models/user');

const login = async(req, res = response) => {

    const { correo, password } = req.body;

    try {

        // Verificar si el email existe
        const user = await User.findOne({ correo });
        if ( !user ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario o password no son correctos'
            });
        }
        // Verificar si usuario esta activo
        if ( !user.estado ) {
            return res.status(400).json({
                msg: 'El usuario se encuentra desactivado'
            });
        }

        // Verificar la contraseña
        const valiPass = bcryptjs.compareSync( password, user.password );
        if ( !valiPass ) {
            return res.status(400).json({
                msg: 'El usuario o password no son correctos'
            })
        }

        // Generar el JWT
        const token = await generarJWT(user.id);
        
        res.json({
            ok: true,
            uid: user.id,
            nombre: user.nombre,
            correo: user.correo,
            token,
            //user,
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json ({
            msg: 'Halgo salió mal hable con admin'
        })
        
    }


}


const googleSignIn = async(req, res = response ) => {

    const { id_token } = req.body

    try {

        const { nombre, img, correo } = await googleVerify( id_token );
        
        // Verificar si el correo existe en la base datos
        let user = await User.findOne({correo});

        if(!user) {
            // si el usuario no existe se crea
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                google: true
            };

            user = new User( data );
            
            await user.save();
            
        }

        // Si el usuario en DB
        if( !user.estado ) {
            return res.status(401).json({
                msg: 'Hable con el administrador usuario bloqueado'
            });
        }

        // Generar JWT
        const token = await generarJWT(user.id);

        res.json({
            user,
            token,
            ok: true
        })

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        })
    }

}

const revalidarToken = async(req, res = response ) => {

    const { uid } = req;

    // Leer la base de datos
    const user = await User.findById(uid);
    //console.log(user)

    // Generar el JWT
    const token = await generarJWT( uid, user.nombre );

    return res.json({
        ok: true,
        uid, 
        nombre: user.nombre,
        correo: user.correo,
        token
    });

}




module.exports = {
    login,
    googleSignIn,
    revalidarToken
}

