const express = require('express');
const router = express.Router();
const { checkIsAdmin, checkHasEmptyFields, validateJwt } = require('../middlewares');
const {  productControllers } = require('../controllers');
const { newProduct, getAllProducts, getOneProduct, deleteProduct, updateProduct } = productControllers;

router.post('/', validateJwt, checkHasEmptyFields, checkIsAdmin, newProduct)

router.get('/', validateJwt, checkIsAdmin, getAllProducts)

router.get('/:id',validateJwt, checkIsAdmin, getOneProduct)

router.patch('/:id',validateJwt, checkHasEmptyFields, checkIsAdmin, updateProduct)

router.delete('/:id', validateJwt, checkIsAdmin, deleteProduct)

module.exports = router 