const express = require('express');
const router = express.Router();
const { validateJwt, checkIsAdmin } = require('../middlewares');
const { userControllers } = require('../controllers');
const { signup, signin, getOneUser, getAllUsers, updateUser, deleteUser } = userControllers

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/', validateJwt, checkIsAdmin, getAllUsers);
router.get('/:id', validateJwt, checkIsAdmin, getOneUser);
router.patch('/:id', validateJwt, checkIsAdmin, updateUser);
router.delete('/:id', validateJwt, checkIsAdmin, deleteUser);

module.exports = router 