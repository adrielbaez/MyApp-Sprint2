const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({

    allOrders: [{ idProduct: {type: mongoose.Types.ObjectId, ref: 'product'}, amount: {type: Number, required : true}}],
    orderStatus: {
        type: String,
        required: true,
        default: 'PENDIENTE'
    }, 
    address: {
        type: String,
    }, 
    paymentMethod: {
        type: String,
        default: 'EFECTIVO'
    },
    date: {
        type: String,
    }, 
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true,
    },
})

OrderSchema.methods.toJSON = function() {
    const { __v, _id, ...order  } = this.toObject();
    order.id = _id;
    return order;
}

const OrderModel = mongoose.model('order', OrderSchema)

module.exports = OrderModel;