const { request, response } = require("express");
const jwt = require('jsonwebtoken');
const { Laboratorio, User } = require('../models');

// obtenerLaboratorios - paginado-total-populate
const getLaboratorios = async(req= request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true }
    
    const [ total, laboratorios ] = await Promise.all([
        Laboratorio.countDocuments( query ),
        Laboratorio.find( query )
            .skip(Number(desde))
            .limit(Number(limite))

    ])

    res.json({
        total,
        laboratorios
    })
}


// obtenerLaboratorio - populate
const getLaboratorio = async(req, res = response) => {

    const {id} = req.params

    const laboratorio = await Laboratorio.findById(id);

    res.json(laboratorio)
}

const crearLaboratorio = async(req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const labDB = await Laboratorio.findOne({ nombre })

    if (labDB) {
        return res.status(400).json({
            msg: `La Laboratorio ${ labDB.nombre }, ya existe`
        })
    }

    // Genero la data a guardar en la base de datos
    const data = {
        nombre
    }

    const laboratorio = await new Laboratorio(data)

    // guarda en db
    await laboratorio.save();

    res.status(201).json(laboratorio)

}

// actualizarLaboratorio
const actualizarLaboratorio = async(req = request, res = response) => {

    const {id} = req.params

    const {estado, ...data} = req.body
    data.nombre = data.nombre.toUpperCase()

    //const userUdated = await User.findById( data.user ) 
    const laboratorio = await Laboratorio.findOneAndUpdate(id, data, {new: true});
    
    res.json(laboratorio)
     
    
    
}


// borrarLaboratorio - estado:false
const borrarLaboratorio = async(req, res = response)=>{

    const { id } = req.params;
    const laboratorio = await Laboratorio.findByIdAndUpdate( id, { estado: false }, {new: true} );

    // Borrar de la base de datos
    //const user = await User.findByIdAndDelete(id);
    res.json( laboratorio )
    
    
}



module.exports = {
    crearLaboratorio,
    getLaboratorios,
    getLaboratorio,
    actualizarLaboratorio,
    borrarLaboratorio
}