const { response, request } = require('express')


const getUsers = (req= request, res = response) => {

    const {q='Pendejada', nombre='No name', apikey, page='1',limit} = req.query

    res.json({
        msg: 'Controlador getUsers',
        q,
        nombre,
        apikey,
        page,
        limit
    })
}

const postUser = (req, res = response) => {

    const {nombre, edad} = req.body

    res.status(201).json({
        msg: 'Controlador postUser',
        nombre,
        edad
    })
}

const putUser = (req, res = response) => {

    const {id} = req.params

    res.json({
        msg: 'Controlador putUser',
        id
    })
}

const patchUser = (req, res = response) => {
    res.json({
        msg: 'Controlador patchUser API'
    })
}

const deleteUser = (req, res = response)=>{
    res.json({
        msg: 'Controlador deleteUser'
    })
}


module.exports = {
    getUsers,
    postUser,
    putUser,
    patchUser,
    deleteUser
}