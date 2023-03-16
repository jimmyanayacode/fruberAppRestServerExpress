const { request, response } = require("express");
const Product = require("../models/product");

const getAllProducts = async(req=request, res=response ) => {

    const query = { estado: true };

    const products = await Product.find(query)
                    .populate('category', 'nombre')
                        
    res.json({
        products
    });
}

const getProductById = async( req=request, res=response ) => {

    const { id } = req.params

    const product = await Product.findById(id)

    if ( !product ) {
        return res.status(400).json({ msg : 'Producto no encontrado' })
    }

    res.json({
        product
    })
}

const editProductById = async( req=request, res=response ) => {

    const { id } = req.params

    const product = await Product.findByIdAndUpdate(id, {new: true });

    if ( !product ) {
        return res.status(400).json({ msg : 'Producto no encontrado - No se pudo actualizar' });
    }

    res.json({
        product
    })
}

const createProduct = async( req=request, res=response ) => {

    const { nombre, img, categoria, user } = req.body
    const createNewProduct = new Product({nombre, img, categoria, user});

    try {
        await createNewProduct.save();

        return res.status(201).json({
            msg: `Producto ${createNewProduct.nombre} creado en la base de datos`
        })    

    } catch (error) {
        console.log(error);
    }
}

const deleteProductById = async( req=request, res=response) => {

    const { id } = req.params;

    const productChangeStatusFalse = await Product.findByIdAndUpdate( id, { estado:false}, {new: true } );
    res.json({
        productChangeStatusFalse
    })

}

module.exports = {
    createProduct,
    deleteProductById,
    editProductById,
    getAllProducts,
    getProductById,
}