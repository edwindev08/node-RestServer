const { response, request } = require('express')
const bcryptjs = require('bcryptjs');
const User = require('../models/users'); 


const getUsers = async(req= request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true }
    
    const [ total, users ] = await Promise.all([
        User.countDocuments( query ),
        User.find( query )
            .skip(Number(desde))
            .limit(Number(limite))

    ])

    res.json({
        total,
        users
    })
}

const postUser = async(req, res = response) => {

    const { nombre, correo, password, rol } = req.body
    const user = new User({ nombre, correo, password, rol });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt )

    // Guardar en base de datos
    await user.save();
    

    res.json({
        user
    })
}

const putUser = async(req, res = response) => {

    const {id} = req.params
    const {_id, password, google, correo, ...resto } = req.body

    if( password ) {

        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt )
    }

    const user = await User.findByIdAndUpdate(id, resto);

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

    // Borrar de la base de datos
    //const user = await User.findByIdAndDelete(id);
    const user = await User.findByIdAndUpdate( id, { estado: false } );


    res.json(user)
}


module.exports = {
    getUsers,
    postUser,
    putUser,
    patchUser,
    deleteUser
}