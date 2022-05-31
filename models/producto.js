
const {Schema, model} = require('mongoose');


const ProductoSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    codigo: {
        type: Number,
        default: 100,
        required: true,
       // unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    img: {type: String},
    descripcion: {type: String},
    disponible: {
        type: Boolean, 
        default: true, 
    },
    precio_compra: {
        type: Number,
        default: 0
    },
    precio_venta: {
        type: Number,
        default: 0
    },
    ventas: {
        type: Number,
        default: 0
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    lab: {
        type: Schema.Types.ObjectId,
        ref: 'Laboratorio',
        required: true
    },
    presentacion: {
        type: Schema.Types.ObjectId,
        ref: 'Presentacion',
        required: true
    },
    

})

ProductoSchema.methods.toJSON = function() {
    const { __v, estado, ...data} = this.toObject();
    return data;
}


module.exports = model( 'Producto', ProductoSchema )