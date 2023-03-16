const { request, response } = require("express")
const Category = require("../models/category")


const getAllCategories = async( req=request, res=response) => {

    const categories = await Category.find({estado: true});

    res.json({
        categories
    })
    
}

const getCategoryById = async( req=request, res=response) => {

    const { id } = req.params;

    const category = await Category.findById(id);

    if ( !category ) {
        return res.status(400).json({ msg: 'Categoria no encontrado'});
    }

    res.json({
        category
    })
}

const createCategory = async( req=request, res=response ) => {

    const { nombre, user } = req.body
    const createNewCategory = new Category( {nombre, user} );

    try {
        await createNewCategory.save();

        return res.status(201).json({
            msg: `Categoria ${createNewCategory.nombre} creado con exito en la base de datos`
        })
    } catch (error) {
        console.log(error)
    }

}



module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById
}