const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({

    allOrders: {
        type: [{idProduct:String, amount : Number}],
        required: true,
    }, 
    stateOrder: {
        type: String,
        required: true,
        default: 'PENDIENTE'
    }, 
    paymentMethod: {
        type: String,
        default: 'EFECTIVO'
    },
    date: {
        type: String,
    }, 
    total: {
        type: Number,
    },  
    user: {
        type: Object
    } 
})

OrderSchema.methods.toJSON = function() {
    const { __v, _id, ...order  } = this.toObject();
    order.id = _id;
    return order;
}

const OrderModel = mongoose.model('order', OrderSchema)

module.exports = { OrderModel };