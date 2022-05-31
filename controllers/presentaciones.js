const { request, response } = require("express");

const { Presentacion} = require('../models');

// obtenerPresentaciones - paginado-total-populate
const getPresentaciones = async(req= request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true }
    
    const [ total, presentaciones ] = await Promise.all([
        Presentacion.countDocuments( query ),
        Presentacion.find( query )
            .skip(Number(desde))
            .limit(Number(limite))

    ])

    res.json({
        total,
        presentaciones
    })
}


// obtenerPresentacion - populate
const getPresentacion = async(req, res = response) => {

    const {id} = req.params

    const presentacion = await Presentacion.findById(id);

    res.json(presentacion)
}

const crearPresentacion = async(req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const presDB = await Presentacion.findOne({ nombre })

    if (presDB) {
        return res.status(400).json({
            msg: `La Presentacion ${ presDB.nombre }, ya existe`
        })
    }

    // Genero la data a guardar en la base de datos
    const data = {
        nombre
    }

    const presentacion = await new Presentacion(data)

    // guarda en db
    await presentacion.save();

    res.status(201).json(presentacion)

}

// actualizarPresentacion
const actualizarPresentacion = async(req = request, res = response) => {

    const {id} = req.params

    const {estado, ...data} = req.body
    data.nombre = data.nombre.toUpperCase()

    //const userUdated = await User.findById( data.user ) 
    const presentacion = await Presentacion.findOneAndUpdate(id, data, {new: true});
    
    res.json(presentacion)
     
    
    
}


// borrarPresentacion - estado:false
const borrarPresentacion = async(req, res = response)=>{

    const { id } = req.params;
    const presentacion = await Presentacion.findByIdAndUpdate( id, { estado: false }, {new: true} );

    // Borrar de la base de datos
    //const user = await User.findByIdAndDelete(id);
    res.json( presentacion )
    
    
}



module.exports = {
    crearPresentacion,
    getPresentaciones,
    getPresentacion,
    actualizarPresentacion,
    borrarPresentacion
}