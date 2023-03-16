const { Router } = require("express");
const { check } = require("express-validator");
const { getAllProducts, getProductById, editProductById, createProduct, deleteProductById } = require("../controllers/product");
const { roleValidate } = require("../helpers/db-validators");
const { fieldsValidate, jwtValidate, hasRole } = require("../middlewares");


const router = Router();

router.get('/', getAllProducts);

router.get('/:id', [
    check('id', 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'No es un ID válido mongo').isMongoId(),
    fieldsValidate
], getProductById);

router.put('/:id', [
    check('id', 'No es un ID válido mongo').isMongoId(),
    check('rol').custom( roleValidate ),
    fieldsValidate
], editProductById);

router.post('/', [
    check('nombre', 'El nombre del producto es obligatorio').not().isEmpty(),
    check('img', 'La imagen del producto es obligatoria').not().isEmpty(),
    check('categoria', 'No es un ID válido mongo').isMongoId(),
    check('user', 'No es un ID válido mongo').isMongoId(),
    fieldsValidate
], createProduct);

router.delete('/:id', [
    jwtValidate,
    hasRole('ADMIN_ROLE'),
    check('id', 'No es un ID válido mongo').isMongoId(),
    fieldsValidate
], deleteProductById)

module.exports = router;