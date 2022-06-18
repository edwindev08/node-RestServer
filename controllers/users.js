const { response, request } = require('express')
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { Role } = require('../models');



const getUsers = async(req= request, res = response) => {

    const { limite = 10, desde = 0 } = req.query;
    const query = { estado: true }
    
    const users = await Promise.all([
        //User.countDocuments( query ),
        User.find( query )  
            .skip(Number(desde))
            .limit(Number(limite))

    ])

    res.json(users)
}

//obtener usuario

const postUser = async(req, res = response) => {

    const { nombre, correo, password, rol } = req.body
    console.log(nombre)
    
        const dbUser = await User.findOne({correo})
        
        if ( dbUser ) {
            return res.status(400).json({
                ok: false,
                msg: `El correo ${ correo } ya existe`
            });
        }

        const existeRole = await Role.findOne({rol});
        if(!existeRole) {
        //throw new Error(`El rol ${rol} no está en la base de datos`)
            return res.status(400).json({
                ok: false,
                msg: `El rol ${ rol } no es valido`
            });
        }
        

        const user = new User({ nombre, correo, password, rol });

        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync( password, salt )

        // Guardar en base de datos
        await user.save();
    

        res.json({
        ok: true,
        uid: user.id,
        nombre,
        correo,
        rol
        })
    // } catch (error) {
    //     console.log(error);
    //     return res.status(500).json({
    //         ok: false,
    //         msg: 'Por favor hable con el administrador'
    //     });
    // }


    
}

const putUser = async(req, res = response) => {

    const {id} = req.params
    const {_id, password, google, correo, ...resto } = req.body
    // Si viene password
    if( password ) {
        // Encriptela
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt )
    }

    const user = await User.findOneAndUpdate(id, resto, {new: true});

    res.json({
        user
    })
}

const patchUser = (req, res = response) => {
    res.json({
        msg: 'Controlador patchUser API'
    })
}

const deleteUser = async(req, res = response)=>{

    const { id } = req.params;
    const user = await User.findByIdAndUpdate( id, { estado: false }, {new: true} );

    // Borrar de la base de datos
    //const user = await User.findByIdAndDelete(id);
    res.json( user )
    
    
}




module.exports = {
    getUsers,
    postUser,
    putUser,
    patchUser,
    deleteUser
}