const { Schema, model } = require('mongoose');

const OrderSchema = Schema({

    products: {
        type: []
    },

    date: {
        type: Date,
        default: Date.now
    }
});

//Configuramos la respuesta para no enviar __V y el password
OrderSchema.methods.toJSON = function(){
    const { __v, _id, ...order } = this.toObject();
    order.uid = _id;
    return order;
}

module.exports = model('Order', OrderSchema);