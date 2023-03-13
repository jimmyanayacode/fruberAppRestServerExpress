
const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { fieldsValidate } = require('../middlewares/fields-validate');
const { jwtValidate } = require('../middlewares/jwt-validate');

const router = Router();

router.post('/login',[
    check('email', 'El correo es obligatorio').not().isEmpty(),
    check('email', 'El email no es válido').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    fieldsValidate
], login)

module.exports = router;