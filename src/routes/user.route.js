const express = require('express');
const router = express.Router();
const { validateJwt, checkIsAdmin, checkUserDiscontinued } = require('../middlewares');
const { userControllers } = require('../controllers');
const {
  signup,
  signin,
  getOneUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getHistoryUser,
  userState,
} = userControllers;

router.post('/signup', signup);

router.post('/signin',checkUserDiscontinued, signin);

router.get('/', validateJwt, checkIsAdmin, getAllUsers);

router.get('/:id', validateJwt, checkIsAdmin, getOneUser);

router.patch('/:id', validateJwt, checkIsAdmin, updateUser);

router.patch('/state/:id', validateJwt, checkIsAdmin, userState);

router.delete('/:id', validateJwt, checkIsAdmin, deleteUser);

router.get('/:id/history', validateJwt, getHistoryUser);

module.exports = router;
/**
 * @swagger
 * /api/users/signup:
 *   post:
 *     summary: Create new User
 *     tags: [users]
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
 *                nickName:
 *                  description: User nickName
 *                  type: string
 *                firstName:
 *                  description: User firstName
 *                  type: string
 *                lastName:
 *                  description: User lastName
 *                  type: string
 *                email:
 *                  description: User email
 *                  type: string
 *                phone:
 *                  description: User number phone
 *                  type: string
 *                address:
 *                  description: User address
 *                  type: string
 *                password:
 *                  description: User password
 *                  type: string
 *                isAdmin:
 *                  description: true or false
 *                  type: boolean
 *             example:
 *               nickName: fakeUser
 *               firstName: Jhon
 *               lastName: Doe
 *               email: fake@gmail.com
 *               phone: 123645789
 *               address: wall street 23
 *               password:  password
 *               isAdmin: false
 *     responses:
 *       "201":
 *         description: User Created
 */

/**
 * @swagger
 * /api/users/signin:
 *   post:
 *     summary: User Signin 
 *     tags: [users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - User
 *               - Password
 *             properties:
 *                user:
 *                  description: Nickname or Email
 *                  type: string
 *                password:
 *                  description: User password
 *                  type: string
 *             example:
 *               user: fake@gmail.com
 *               password:  password
 *     responses:
 *       "200":
 *         description: Success Login
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all Users (Only Admins).
 *     tags: [users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: All Users
 */

/**
 * @swagger
 * /api/users/{id}:
 *  get:
 *    summary: Get user by ID (Only Admins).
 *    tags: [users]
 *    description : Get user by ID.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - name: id
 *        in: path
 *        description: User ID
 *        required: true
 *        type: string
 *    responses:
 *      200:
 *       description: Get user success
 *
 */

/**
 * @swagger
 * /api/users/{id}/history:
 *  get:
 *    summary: Get historial user, by user ID.
 *    tags: [users]
 *    description : Get historial user, by user ID.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - name: id
 *        in: path
 *        description: User ID
 *        required: true
 *        type: string
 *    responses:
 *      200:
 *       description: Get historial user.
 *
 */


/**
 * @swagger
 * /api/users/{id}:
 *  patch:
 *    summary: Update user by ID (Only Admins).
 *    tags: [users]
 *    description : Update user by ID (Only Admins).
 *    consumes:
 *      - application/json
 *    parameters:
 *      - name: id
 *        in: path
 *        description: User ID
 *        required: true
 *        type: integer
 *      - in: body
 *        name: users
 *        description: User to create
 *        schema:
 *          type: object
 *          required:
 *            - id
 *          properties:
 *            nickName:
 *              description: User nickName
 *              type: string
 *            firstName:
 *              description: User firstName
 *              type: string
 *            lastName:
 *              description: User lastName
 *              type: string
 *            email:
 *              description: User email
 *              type: string
 *            phone:
 *              description: User number phone
 *              type: string
 *            address:
 *              description: User address
 *              type: string
 *    responses:
 *      200:
 *       description: Updated User.
 *
 */

/**
 * @swagger
 * /api/users/state/{id}:
 *  patch:
 *    summary: Update state user, by user ID (Only Admins).
 *    tags: [users]
 *    description : Update state user, by user ID (Only Admins).
 *    consumes:
 *      - application/json
 *    parameters:
 *      - name: id
 *        in: path
 *        description: User ID
 *        required: true
 *        type: integer
 *      - in: body
 *        name: users
 *        description: User to create
 *        schema:
 *          type: object
 *          required:
 *            - id
 *          properties:
 *            discontinued:
 *              description: State User 
 *              type: boolean
 *    responses:
 *      200:
 *       description: Updated User.
 *
 */

/**
 * @swagger
 * /api/users/{id}:
 *  delete:
 *    summary: Delete User (Only Admins).
 *    tags: [users]
 *    description : Delete User.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - name: id
 *        in: path
 *        description: User ID
 *        required: true
 *        type: string
 *    responses:
 *      200:
 *       description: User Deleted.
 *
 */