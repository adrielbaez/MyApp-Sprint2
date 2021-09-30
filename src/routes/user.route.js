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

