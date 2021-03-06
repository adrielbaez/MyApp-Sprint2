const express = require('express');
const { orderControllers } = require('../controllers');
const router = express.Router();
const { validateJwt, checkIsAdmin, checkHasEmptyFields, checkOrderState } = require('../middlewares');
const { newOrder, updateOrder, getAllOrders, getOneOrder, deleteOrder } = orderControllers;

router.post('/',validateJwt, newOrder);

router.patch('/:id',validateJwt, checkHasEmptyFields, checkOrderState, updateOrder);

router.get('/',validateJwt, checkIsAdmin, getAllOrders);

router.get('/:id',validateJwt, getOneOrder);

router.delete('/:id',validateJwt, checkIsAdmin, deleteOrder);

module.exports = router; 

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: new Order
 *     tags: [orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - allOrders
 *               - stateOrder
 *               - paymentMethod
 *             properties:
 *               allOrders:
 *                 type: array
 *                 description: object array with idProduct and amount properties
 *               orderStatus:
 *                 type: integer
 *                 description: order status
 *               paymentMethod:
 *                 type: string
 *                 description: payment Method
 *             example:
 *               allOrders: [{"idProduct":"idMongo", "amount": 1}]
 *               orderStatus: PENDIENTE
 *               paymentMethod: EFECTIVO
 *     responses:
 *       "201":
 *         description: Created
 */

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders (Only Admins).
 *     tags: [orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: All orders
 */ 

/**
 * @swagger
 * /api/orders/{id}:
 *  get:
 *    summary: Get order by ID (Only Admins).
 *    tags: [orders]
 *    description : Get order by ID.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - name: id
 *        in: path
 *        description: order ID
 *        required: true
 *        type: string
 *    responses:
 *      200:
 *       description: Get order success
 *
 */

/**
 * @swagger
 * /api/orders/{id}:
 *  patch:
*     summary: Update a order
 *     description: Only admins can update other orders.
 *     tags: [orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: order id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - allOrders
 *               - stateOrder
 *               - paymentMethod
 *             properties:
 *               allOrders:
 *                 type: array
 *                 description: object array with idProduct and amount properties
 *               orderStatus:
 *                 type: integer
 *                 description: order status
 *               paymentMethod:
 *                 type: string
 *                 description: payment Method
 *             example:
 *               allOrders: [{"idProduct":"idMongo", "amount": 1}]
 *               orderStatus: PENDIENTE
 *               paymentMethod: EFECTIVO
 *     responses:
 *       "200":
 *         description: OK
 */

/**
 * @swagger
 * /api/orders/{id}:
 *  delete:
*     summary: Delete Order (Only Admins).
 *     description: Only admins can delete orders.
 *     tags: [orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order id
 *     responses:
 *       "200":
 *         description: OK
 */