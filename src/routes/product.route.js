const express = require('express');
const { newProduct, getAllProducts, getOneProduct, deleteProduct, updateProduct } = require('../controllers');
const { checkIsAdmin, checkHasEmptyFields, validateJwt } = require('../middlewares');
const router = express.Router();

router.post('/', validateJwt, checkHasEmptyFields, checkIsAdmin, newProduct)

router.get('/', validateJwt, checkIsAdmin, getAllProducts)

router.get('/:id',validateJwt, checkIsAdmin, getOneProduct)

router.patch('/:id',validateJwt, checkHasEmptyFields, checkIsAdmin, updateProduct)

router.delete('/:id', validateJwt, checkIsAdmin, deleteProduct)

module.exports = router 