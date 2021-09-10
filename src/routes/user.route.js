const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/user.controllers');
const { signup, signin, getAllUsers, getOneUser, updateUser, deleteUser } = userControllers

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/', getAllUsers);
router.get('/:id', getOneUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;

// =============== USERS ROUTE =================
/**
 * @swagger
 * /api/users/signup:
 *  post:
 *    summary: Crear nuevo usuario.
 *    tags: [users]
 *    description : Crear nuevo usuario.
 *    consumes:
 *      - application/json
 *    parameters:
 *
 *      - in: body
 *        name: users
 *        description: Usuario a crear
 *        schema:
 *          type: object
 *          required:
 *            - id
 *          properties:
 *            id:
 *              description: ID de usuario
 *              type: integer
 *            nickName:
 *              description: Nombre de usuario
 *              type: string
 *            fullName:
 *              description: Nombre completo del usuario
 *              type: string
 *            email:
 *              description: Correo electronico del usuario
 *              type: string
 *            phone:
 *              description: Numero de telefono del usuario
 *              type: string
 *            address:
 *              description: Direccion del usuario
 *              type: string
 *            password:
 *              description: Contraseña del usuario
 *              type: string
 *            admin:
 *              description: Palabra clave para role admin
 *              type: string
 *    responses:
 *      200:
 *       description: Nuevo Usuario creado
 *
 */
/**
 * @swagger
 * /api/users/signin:
 *  post:
 *    summary: Inicio de sesion  del usuario.
 *    tags: [users]
 *    description : Inicio de sesion  del usuario.
 *    consumes:
 *      - application/json
 *    parameters:
 *
 *      - in: body
 *        name: users
 *        description: Usuario que va iniciar sesion
 *        schema:
 *          type: object
 *          required:
 *            - id
 *          properties:
 *            user:
 *              description: Correo electronico del usuario
 *              type: string
 *            password:
 *              description: Contraseña del usuario
 *              type: string
 *    responses:
 *      200:
 *       description: Inicio de sesion exitosa
 *
 */


/**
 * @swagger
 * /api/users/loggout:
 *  post:
 *    summary: Cerrar sesion  del usuario.
 *    tags: [users]
 *    description : Cerrar sesion  del usuario.
 *    consumes:
 *      - application/json
 *    parameters:
 *
 *      - in: body
 *        name: users
 *        description: Usuario que va cerrar sesion
 *        schema:
 *          type: object
 *          required:
 *            - id
 *          properties:
 *            user:
 *              description: Correo electronico del usuario
 *              type: string
 *    responses:
 *      200:
 *       description: Cierre de sesion exitosa
 *
 */
/**
 * @swagger
 * /api/users/orders:
 *  post:
 *    summary: Obtener el historial de pedidos del usuario.
 *    tags: [users]
 *    description : Obtener el historial de pedidos del usuario.
 *    consumes:
 *      - application/json
 *    parameters:
 *
 *      - in: body
 *        name: users
 *        description: Usuario que va obtener el historial de pedidos
 *        schema:
 *          type: object
 *          required:
 *            - id
 *          properties:
 *            userEmail:
 *              description: Correo electronico del usuario
 *              type: string
 *    responses:
 *      200:
 *       description: historial de pedidos
 *
 */