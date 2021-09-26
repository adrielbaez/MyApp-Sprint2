const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    nameItem: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    picture: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    deleted: {
        type: Boolean,
        default: false
    },
})

ProductSchema.methods.toJSON = function() {
    const { __v, _id, ...product  } = this.toObject();
    product.id = _id;
    return product;
}

const ProductModel = mongoose.model('product', ProductSchema)

module.exports = { ProductModel };