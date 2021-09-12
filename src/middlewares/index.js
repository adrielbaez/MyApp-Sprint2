const validateJwt = require('./validateJwt');
const checkIsAdmin = require('./checkIsAdmin')
const checkHasEmptyFields = require('./checkHasEmptyFields')

module.exports = {
    ...validateJwt,
    ...checkIsAdmin,
    ...checkHasEmptyFields
}