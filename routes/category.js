const { Router } = require("express");
const { check } = require("express-validator");

const { getAllCategories, getCategoryById, createCategory } = require("../controllers/categories");
const { nameValidate } = require("../helpers/db-validators");
const { fieldsValidate } = require("../middlewares");

const router = Router();

router.get('/', getAllCategories);

router.get('/:id', [
    check('id', 'No es un ID válido mongo').isMongoId(),
    fieldsValidate
],getCategoryById);

router.post('/', [
    check('nombre', 'El nombre de la categoria es obligatorio').not().isEmpty(),
    check('user', 'El id del usuario es obligatorio').not().isEmpty(),
    check('user', 'No es un ID válido mongo').isMongoId(),
    check('nombre').custom(nameValidate),
    fieldsValidate
], createCategory);


module.exports = router;