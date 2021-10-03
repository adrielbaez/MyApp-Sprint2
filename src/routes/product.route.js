const express = require('express');
const router = express.Router();
const {
  checkIsAdmin,
  checkHasEmptyFields,
  validateJwt,
  existsCache,
} = require('../middlewares');
const { productControllers } = require('../controllers');
const {
  newProduct,
  getAllProducts,
  getOneProduct,
  deleteProduct,
  updateProduct,
  updatePrice,
} = productControllers;

router.post('/', validateJwt, checkHasEmptyFields, checkIsAdmin, newProduct);

router.get('/', validateJwt, checkIsAdmin, existsCache, getAllProducts);

router.get('/:id', validateJwt, checkIsAdmin, getOneProduct);

router.patch(
  '/:id',
  validateJwt,
  checkHasEmptyFields,
  checkIsAdmin,
  updateProduct
);

router.patch(
  '/price/:id',
  validateJwt,
  checkHasEmptyFields,
  checkIsAdmin,
  updatePrice
);

router.delete('/:id', validateJwt, checkIsAdmin, deleteProduct);

module.exports = router;
/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: new Product
 *     tags: [products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name item
 *               - price
 *               - picture
 *               - stock
 *             properties:
 *               nameItem:
 *                 type: string
 *                 description: Name Product
 *               price:
 *                 type: integer
 *                 description: Price Product
 *               picture:
 *                 type: string
 *                 description: Picture Product
 *               stock:
 *                 type: integer
 *                 description: stock Product
 *             example:
 *               nameItem: Hamburguesa
 *               price: 250
 *               picture: fotito
 *               stock: 10
 *     responses:
 *       "201":
 *         description: Created
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products (Only Admins).
 *     tags: [products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: All products
 */ 

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *    summary: Get product by ID (Only Admins).
 *    tags: [products]
 *    description : Get product by ID.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - name: id
 *        in: path
 *        description: product ID
 *        required: true
 *        type: string
 *    responses:
 *      200:
 *       description: Get product success
 *
 */

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
*     summary: Update a product
 *     description: Only admins can update other products.
 *     tags: [products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: product id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name item
 *               - price
 *               - picture
 *               - stock
 *             properties:
 *               nameItem:
 *                 type: string
 *                 description: Name Product
 *               price:
 *                 type: integer
 *                 description: Price Product
 *               picture:
 *                 type: string
 *                 description: Picture Product
 *               stock:
 *                 type: integer
 *                 description: stock Product
 *             example:
 *               nameItem: Hamburguesa
 *               price: 250
 *               picture: fotito
 *               stock: 10
 *     responses:
 *       "200":
 *         description: OK
 */

/**
 * @swagger
 * /api/products/price/{id}:
 *  patch:
*     summary: Updates the price of a product
 *     description: Only admins can update the price of products.
 *     tags: [products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: product id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - price
 *             properties:
 *               price:
 *                 type: integer
 *                 description: Price Product
 *             example:
 *               price: 250
 *     responses:
 *       "200":
 *         description: OK
 */

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
*     summary: Delete Product (Only Admins).
 *     description: Only admins can delete products.
 *     tags: [products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product id
 *     responses:
 *       "200":
 *         description: OK
 */