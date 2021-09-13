const express = require('express');
const { orderControllers } = require('../controllers');
const router = express.Router();
const { validateJwt, checkIsAdmin } = require('../middlewares');
const { newOrder } = orderControllers;

router.post('/',validateJwt, newOrder)

module.exports = router 