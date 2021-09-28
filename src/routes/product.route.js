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
 *  post:
 *    summary: Create new Product (Only Admins).
 *    tags: [products]
 *    description : Create new Product (Only Admins).
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: products
 *        description: User to create
 *        schema:
 *          type: object
 *          required:
 *            - id
 *          properties:
 *            nameItem:
 *              description: Name Product
 *              type: string
 *            price:
 *              description: Price Product
 *              type: integer
 *            picture:
 *              description: Image Product
 *              type: string
 *            stock:
 *              description: stock Product
 *              type: integer
 *    responses:
 *      201:
 *       description: New Product created.
 *
 */

/**
 * @swagger
 * /api/products:
 *  get:
 *    summary: Get all products (Only Admins).
 *    tags: [products]
 *    description : Get all products.
 *    consumes:
 *      - application/json
 *    responses:
 *      200:
 *       description: All products.
 *
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
 *    summary: Update Product by ID (Only Admins).
 *    tags: [products]
 *    description : Update Product by ID (Only Admins).
 *    consumes:
 *      - application/json
 *    parameters:
 *      - name: id
 *        in: path
 *        description: Product ID
 *        required: true
 *        type: integer
 *      - in: body
 *        name: products
 *        description: Product to create
 *        schema:
 *          type: object
 *          required:
 *            - id
 *          properties:
 *            nameItem:
 *              description: Name Product
 *              type: string
 *            price:
 *              description: Price Product
 *              type: integer
 *            picture:
 *              description: Image Product
 *              type: string
 *            stock:
 *              description: stock Product
 *              type: integer
 *    responses:
 *      200:
 *       description: Updated Product.
 *
 */

/**
 * @swagger
 * /api/products/price/{id}:
 *  patch:
 *    summary: Update price product, by Product ID (Only Admins).
 *    tags: [products]
 *    description : Update price product, by Product ID (Only Admins).
 *    consumes:
 *      - application/json
 *    parameters:
 *      - name: id
 *        in: path
 *        description: Product ID
 *        required: true
 *        type: integer
 *      - in: body
 *        name: products
 *        description: Product to create
 *        schema:
 *          type: object
 *          required:
 *            - id
 *          properties:
 *            price:
 *              description: Price Product
 *              type: integer
 *    responses:
 *      200:
 *       description: Updated Product.
 *
 */

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *    summary: Delete Product (Only Admins).
 *    tags: [products]
 *    description : Delete Product.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - name: id
 *        in: path
 *        description: Product ID
 *        required: true
 *        type: string
 *    responses:
 *      200:
 *       description: Product Deleted.
 *
 */
