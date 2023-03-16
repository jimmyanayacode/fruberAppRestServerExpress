const { Schema, model } = require('mongoose');

const CategorySchema = Schema({
    
    nombre: {
        type: String,
        require: [true, 'El nombre de la categoria es obligatorio'],
        unique: true
    },

    estado: {
        type: Boolean,
        default: true,
    },

    user:{
        type: Schema.Types.ObjectId,
        ref: 'User', 
        require: [true, 'El usuario es obligatorio' ]  
    },

});

//Configuramos la respuesta para no enviar __V y el password
CategorySchema.methods.toJSON = function(){
    const { __v, _id, ...category } = this.toObject();
    category.uid = _id;
    return category;
}

module.exports = model('Category', CategorySchema);