
const { Router } = require('express');
const { usersGet, userEdit, userPost, userDelete, userPatch } = require('../controllers/users.controllers');

const router = Router();

router.get('/', usersGet);

router.put('/:id', userEdit);

router.post('/', userPost);

router.patch('/:id', userPatch);

router.delete('/:id', userDelete);


module.exports = router;


