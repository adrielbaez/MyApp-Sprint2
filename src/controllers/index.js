const userControllers = require('./user.controllers')
const productControllers = require('./product.controller')

module.exports ={
    ...userControllers,
    ...productControllers,
}