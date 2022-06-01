const { response } = require("express");
const { Producto } = require('../models');

// obtenerProductos - paginado-total-populate
const getProductos = async(req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true }
    
    const [ total, productos ] = await Promise.all([
        Producto.countDocuments( query ),
        Producto.find( query )
            .populate('categoria','nombre')
            .populate('lab','nombre')
            .populate('presentacion','nombre')
            .skip(Number(desde))
            .limit(Number(limite))

    ])

    res.json({
        total,
        productos
    })
}


// obtenerProducto - populate
const getProducto = async(req, res = response) => {

    const {id} = req.params

    const producto = await Producto.findById(id)
                        .populate('categoria','nombre')
                        .populate('lab','nombre')
                        .populate('presentacion','nombre')

    res.json({
        producto
    })
}

const crearProducto = async(req, res = response) => {

    const {estado,...body} = req.body
    const codigoDB = await Producto.findOne({codigo: body.codigo})
    const prodDB = await Producto.findOne({ nombre: body.nombre.toUpperCase() })
    

    
    if (codigoDB) {
        return res.status(400).json({
            msg: `El cdigo ${ codigoDB.codigo}, ya existe`
        })
    }
    
    
    if (prodDB) {
        return res.status(400).json({
            msg: `El producto ${ prodDB.nombre }, ya existe`
        })
    }
    

    // Genero la data a guardar en la base de datos
    const data = {
        ...body,
        nombre: req.body.nombre.toUpperCase(),
        codigo: req.body.codigo
        

    }

    const producto = await new Producto(data)

    // guarda en db
    await producto.save();

    res.status(201).json(producto)

}

// actualizarProducto
const actualizarProducto = async(req, res = response) => {

    const {id} = req.params
 
    const {estado, ...data} = req.body
    

    if(data.nombre) {
        
        const prodDB = await Producto.findOne({ nombre: data.nombre.toUpperCase() })
        if (prodDB) {
            return res.status(400).json({
                msg: `El producto ${ prodDB.nombre }, ya existe`
            })
        }

    }
    
    console.log(id)
    //const userUdated = await User.findById( data.user ) 
    const producto = await Producto.findByIdAndUpdate(id, data, {new: true});
    console.log(producto)
    res.json(producto)
     
    
    
}


// borrarProducto - estado:false
const borrarProducto = async(req, res = response)=>{

    const { id } = req.params;
    const producto = await Producto.findByIdAndUpdate( id, { estado: false }, {new: true} );

    // Borrar de la base de datos
    //const user = await User.findByIdAndDelete(id);
    res.json( producto )
    
    
}



module.exports = {
    crearProducto,
    getProductos,
    getProducto,
    actualizarProducto,
    borrarProducto,
}