const { Schema, model } = require('mongoose');

const ProductShema = Schema({

    nombre:{
        type: String,
        require: [true, 'El nombre del producto es obligatorio.'],
        unique: true
    },

    estado:{
        type: Boolean,
        default: true
    },

    user:{
        type: Schema.Types.ObjectId,
        ref: 'User', 
        require: true   
    }, 

    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        require: [true, 'La categoria del producto es obligatoria'],
    },

    available: {
        type: Boolean,
        default: true
    },

    precio:{
        type: Number,
        default: 0
    },

    img: {
        type: String,
        require: [true, 'La imagen del producto es obligatoria.']
    },
});

//Configuramos la respuesta para no enviar __V y el password
ProductShema.methods.toJSON = function(){
    const { __v, _id, ...product } = this.toObject();
    product.uid = _id;
    return product;
}

module.exports = model('Product', ProductShema);