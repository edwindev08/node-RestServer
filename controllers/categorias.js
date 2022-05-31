const { response } = require("express");
const { Categoria } = require('../models');

// obtenerCategorias - paginado-total-populate
const getCategorias = async(req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true }
    
    const [ total, categorias ] = await Promise.all([
        Categoria.countDocuments( query ),
        Categoria.find( query )
            .populate('user','nombre')
            .skip(Number(desde))
            .limit(Number(limite))

    ])

    res.json({
        total,
        categorias
    })
}


// obtenerCategoria - populate
const getCategoria = async(req, res = response) => {

    const {id} = req.params

    const categoria = await Categoria.findById(id).populate('user','nombre');

    res.json({
        categoria
    })
}

const crearCategoria = async(req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre })

    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${ categoriaDB.nombre }, ya existe`
        })
    }

    // Genero la data a guardar en la base de datos
    const data = {
        nombre,
        user: req.user._id
    }

    const categoria = await new Categoria(data)

    // guarda en db
    await categoria.save();

    res.status(201).json(categoria)

}

// actualizarCategoria
const actualizarCategoria = async(req, res = response) => {

    const {id} = req.params

    const {estado, user, ...data} = req.body
    data.nombre = data.nombre.toUpperCase()
    data.user = req.user._id;

    //const userUdated = await User.findById( data.user ) 
    const categoria = await Categoria.findOneAndUpdate(id, data, {new: true});
    
    res.json(categoria)
     
    
    
}


// borrarCategoria - estado:false
const borrarCategoria = async(req, res = response)=>{

    const { id } = req.params;
    const categoria = await Categoria.findByIdAndUpdate( id, { estado: false }, {new: true} );

    // Borrar de la base de datos
    //const user = await User.findByIdAndDelete(id);
    res.json( categoria )
    
    
}



module.exports = {
    crearCategoria,
    getCategorias,
    getCategoria,
    actualizarCategoria,
    borrarCategoria,
}