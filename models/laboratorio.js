
const {Schema, model} = require('mongoose');


const LaboratorioSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    }

})

LaboratorioSchema.methods.toJSON = function() {
    const { __v, estado, ...data} = this.toObject();
    return data;
}


module.exports = model( 'Laboratorio', LaboratorioSchema )