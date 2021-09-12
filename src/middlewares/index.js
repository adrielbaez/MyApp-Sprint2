const validateJwt = require('./validateJwt');
const checkIsAdmin = require('./checkIsAdmin')

module.exports = {
    ...validateJwt,
    ...checkIsAdmin
}