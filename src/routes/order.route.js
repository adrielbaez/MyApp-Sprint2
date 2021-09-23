const express = require('express');
const { orderControllers } = require('../controllers');
const router = express.Router();
const { validateJwt, checkIsAdmin, checkHasEmptyFields, checkOrderState } = require('../middlewares');
const { newOrder, updateOrder, getAllOrders } = orderControllers;

router.post('/',validateJwt, newOrder);
router.patch('/:id',validateJwt, checkHasEmptyFields, checkOrderState, updateOrder);
router.get('/',validateJwt, checkIsAdmin, getAllOrders);
router.get('/:id',validateJwt, getAllOrders);

module.exports = router 