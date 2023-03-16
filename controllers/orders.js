const { response } = require("express");
const Order = require("../models/order");

const getAllOrders = async( req, res=response ) => {

    const orders = await Order.find()

    res.json({
        orders
    })
}

const createOrder = async( req, res=response ) => {

   const pedido = req.body
   console.log(pedido)
   const createNewOrder = new Order();
   createNewOrder.products = pedido
   
    try {
        await createNewOrder.save();
        
        return res.status(201).json({
            msg: `Pedido creado con exito  en la base de datos`
        })
    } catch (error) {
        console.log(error);
    } 

    res.json({
        msg: 'Pedido registrado en Base de dato',
        createNewOrder
    })

}

module.exports = {
    createOrder,
    getAllOrders
}