const Server = require('./server');
const UserModel = require('./user.model');
const ProductModel = require('./product.model');

module.exports = {
    ...Server,
    ...UserModel,
    ...ProductModel
}