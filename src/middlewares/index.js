const validateJwt = require('./validateJwt');
const checkIsAdmin = require('./checkIsAdmin')
const checkHasEmptyFields = require('./checkHasEmptyFields')
const checkOrderState = require('./checkOrderState')

module.exports = {
    ...validateJwt,
    ...checkIsAdmin,
    ...checkHasEmptyFields,
    checkOrderState
}