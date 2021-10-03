const express = require('express');
const router = express.Router();
const { checkIsAdmin, checkHasEmptyFields, validateJwt } = require('../middlewares');
const {  paymentControllers } = require('../controllers');
const { newPaymentMethod, getAllPaymentMethods, getOneMethodPayment, updateMethodPayment, deletePaymentMethod } = paymentControllers;

router.post('/', validateJwt, checkHasEmptyFields, checkIsAdmin, newPaymentMethod);

router.get('/', validateJwt, checkIsAdmin, getAllPaymentMethods);

router.get('/:id',validateJwt, checkIsAdmin, getOneMethodPayment);

router.patch('/:id',validateJwt, checkHasEmptyFields, checkIsAdmin, updateMethodPayment);

router.delete('/:id', validateJwt, checkIsAdmin, deletePaymentMethod);

module.exports = router; 

/**
 * @swagger
 * /api/payments:
 *   post:
 *     summary: new Payment Method
 *     tags: [payment methods]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - paymentMethod
 *             properties:
 *               paymentMethod:
 *                 type: string
 *                 description: Name Payment Method
 *             example:
 *               paymentMethod: Tarjeta de Debito
 *     responses:
 *       "201":
 *         description: Created
 */

/**
 * @swagger
 * /api/payments:
 *   get:
 *     summary: Get all Payment Methods (Only Admins). 
 *     tags: [payment methods]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: All Payment Methods
 */ 

/**
 * @swagger
 * /api/payments/{id}:
 *  get:
 *    summary: Get payment method by ID (Only Admins).
 *    tags: [payment methods]
 *    description : Get payment method by ID.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - name: id
 *        in: path
 *        description: payment method ID
 *        required: true
 *        type: string
 *    responses:
 *      200:
 *       description: Get payment method success
 *
 */

/**
 * @swagger
 * /api/payments/{id}:
 *  patch:
*     summary: Update a payment method
 *     description: Only admins can update other payment methods.
 *     tags: [payment methods]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: payment method id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - paymentMethod
 *             properties:
 *               paymentMethod:
 *                 type: string
 *                 description: Name Payment Method
 *             example:
 *               paymentMethod: Tarjeta de Debito
 *     responses:
 *       "200":
 *         description: OK
 */

/**
 * @swagger
 * /api/payments/{id}:
 *  delete:
 *     summary: Delete Payment Method (Only Admins).
 *     description: Only admins can delete Payments Methods.
 *     tags: [payment methods]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Payment Method id
 *     responses:
 *       "200":
 *         description: OK
 */