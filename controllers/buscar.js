const { response } = require("express")
const { ObjectId } = require('mongoose').Types

const { 
    User, 
    Categoria, 
    Producto, 
    Laboratorio, 
    Presentacion 
} = require("../models/")

const collections = [
    'users',
    'categorias',
    'productos',
    'laboratorios',
    'presentaciones'
]

const buscarUsers = async( termino ='', res = response ) => {

    const esMongoID = ObjectId.isValid( termino ) // TRUE
    // >Buscar por ID de usuario
    if( esMongoID) {
        
        const user = await User.findById(termino)
        
        return res.json({
            results: ( user ) ? [ user ] : []
        })
    }
    // Buscar por nombre con expresión regular RegExp
    const regex = new RegExp( termino, 'i' )
    const users = await User.find({ // Tambien usar el count
        $or: [{ nombre: regex }, { correo: regex }], // $or propiedad de mongo para buscar por mas de un campo en mongo db
        $and: [{ estado: true }] // $and condición de mongo
    })

    res.json({
        results: users
    })
}

const buscarCategorias = async( termino = '', res = response ) => {

    const esMongoID = ObjectId.isValid( termino ) // TRUE 

    if ( esMongoID ) {
        const categoria = await Categoria.findById(termino)
        return res.json({
            results: ( categoria ) ? [ categoria ] : []
        })
    }

    const regex = new RegExp( termino, 'i' )
    const categorias = await Categoria.find({ nombre: regex, estado: true })

    res.json({
        results: categorias
    })

}

const buscarProductos = async( termino = '', res = response ) => {

    const esMongoID = ObjectId.isValid( termino ) // TRUE 

    if ( esMongoID ) {
        const producto = await Producto.findById(termino)
                            .populate('categoria','nombre')
                            .populate('lab','nombre')
                            .populate('presentacion','nombre')
        return res.json({
            results: ( producto ) ? [ producto ] : []
        })
    }

    const regex = new RegExp( termino, 'i' )
    const productos = await Producto.find({ nombre: regex, estado: true })
                            .populate('categoria','nombre')
                            .populate('lab','nombre')
                            .populate('presentacion','nombre')

    res.json({
        results: productos
    })

}

const buscarLaboratorios = async( termino = '', res = response ) => {

    const esMongoID = ObjectId.isValid( termino ) // TRUE 

    if ( esMongoID ) {
        const laboratorio = await Laboratorio.findById(termino)
        return res.json({
            results: ( laboratorio ) ? [ laboratorio ] : []
        })
    }

    const regex = new RegExp( termino, 'i' )
    const laboratorios = await Laboratorio.find({ nombre: regex, estado: true })

    res.json({
        results: laboratorios
    })

}

const buscarPresentaciones = async( termino = '', res = response ) => {

    const esMongoID = ObjectId.isValid( termino ) // TRUE 

    if ( esMongoID ) {
        const presentacion = await Presentacion.findById(termino)
        return res.json({
            results: ( presentacion ) ? [ presentacion ] : []
        })
    }

    const regex = new RegExp( termino, 'i' )
    const presentaciones = await Presentacion.find({ nombre: regex, estado: true })

    res.json({
        results: presentaciones
    })

}

const buscar = (req, res = response) => {

    const { coleccion, termino } = req.params

    if(!collections.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${collections}`
        })
    }

    switch (coleccion) {

        case 'users':
            buscarUsers(termino, res)
            
        break

        case 'categorias':
            buscarCategorias(termino, res)
            
        break

        case 'productos':
            buscarProductos(termino, res)
            
        break
        
        case 'laboratorios':
            buscarLaboratorios(termino, res)
            
        break
        
        case 'presentaciones':
            buscarPresentaciones(termino, res)
            
        break

        default:
            res.status(500).json({
                msg: 'No se hizo esta busqueda'
            })

        break
    }


}



module.exports = {
    buscar
}