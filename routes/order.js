const { Router } = require("express");
const { check } = require("express-validator");
const { getAllOrders, createOrder } = require("../controllers/orders");
const { fieldsValidate } = require("../middlewares");

const router = Router()

router.get('/', getAllOrders)

router.post('/', [
    check('pedido', 'El nombre es obligatorio').not().isEmpty(),
    fieldsValidate
],createOrder)

module.exports = router;