
const { Router } = require('express');
const { check } = require('express-validator');
const { usersGet, userEdit, userPost, userDelete, userPatch } = require('../controllers/users');
const { roleValidate, emailValidate, userIdValidate } = require('../helpers/db-validators');
const { fieldsValidate } = require('../middlewares/fields-validate');

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
    /* check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']), */
    check('email', 'El email no es válido').custom(emailValidate),
    check('rol').custom( roleValidate ),
    fieldsValidate
], userPost);

router.patch('/:id', userPatch);

router.delete('/:id', [
    check('id', 'No es un ID válido mongo').isMongoId(),
    check('id').custom(userIdValidate),
    fieldsValidate
], userDelete);


module.exports = router;


