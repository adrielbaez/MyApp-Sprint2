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

