
const { Router } = require('express');
const { check } = require('express-validator');
const { usersGet, userEdit, userPost, userDelete, userPatch } = require('../controllers/users');
const { roleValidate, emailValidate, userIdValidate } = require('../helpers/db-validators');

const { fieldsValidate, jwtValidate, isAdminRole, hasRole } = require('../middlewares')

const router = Router();

router.get('/', usersGet);

router.put('/:id',[
    check('id', 'No es un ID válido mongo').isMongoId(),
    check('id').custom(userIdValidate),
    check('rol').custom( roleValidate ),
    fieldsValidate
], userEdit);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser más de 6 letras').isLength({min:6}),
    check('email', 'El email no es válido').isEmail(),
    check('email', 'El email no existe en la BD').custom(emailValidate),
    check('rol').custom( roleValidate ),
    fieldsValidate
], userPost);

router.patch('/:id', userPatch);

router.delete('/:id', [
    jwtValidate,
    /* isAdminRole, */
    hasRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un ID válido mongo').isMongoId(),
    check('id').custom(userIdValidate),
    fieldsValidate
], userDelete);

module.exports = router;


