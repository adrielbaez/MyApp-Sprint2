const express = require('express');
const router = express.Router();
const { checkIsAdmin, checkHasEmptyFields, validateJwt, existsCache } = require('../middlewares');
const {  productControllers } = require('../controllers');
const { newProduct, getAllProducts, getOneProduct, deleteProduct, updateProduct, updatePrice } = productControllers;

router.post('/', validateJwt, checkHasEmptyFields, checkIsAdmin, newProduct);

router.get('/', validateJwt, checkIsAdmin, existsCache, getAllProducts);

router.get('/:id',validateJwt, checkIsAdmin, getOneProduct);

router.patch('/:id',validateJwt, checkHasEmptyFields, checkIsAdmin, updateProduct);

router.patch('/price/:id',validateJwt, checkHasEmptyFields, checkIsAdmin, updatePrice);

router.delete('/:id', validateJwt, checkIsAdmin, deleteProduct);

module.exports = router; 