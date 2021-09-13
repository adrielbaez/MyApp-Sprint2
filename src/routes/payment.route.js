const express = require('express');
const router = express.Router();
const { checkIsAdmin, checkHasEmptyFields, validateJwt } = require('../middlewares');
const {  paymentControllers } = require('../controllers');
const { newPaymentMethod, getAllPaymentMethods, getOneMethodPayment, updateMethodPayment, deletePaymentMethod } = paymentControllers;

router.post('/', validateJwt, checkHasEmptyFields, checkIsAdmin, newPaymentMethod)

router.get('/', validateJwt, checkIsAdmin, getAllPaymentMethods)

router.get('/:id',validateJwt, checkIsAdmin, getOneMethodPayment)

router.patch('/:id',validateJwt, checkHasEmptyFields, checkIsAdmin, updateMethodPayment)

router.delete('/:id', validateJwt, checkIsAdmin, deletePaymentMethod)

module.exports = router 