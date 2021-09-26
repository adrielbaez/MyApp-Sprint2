const mongoose = require('mongoose')

const PaymentSchema = new mongoose.Schema({
    paymentMethod: {
        type: String,
        required: true,
        unique: true
    },
    deleted: {
        type: Boolean,
        default: false
    },
})

PaymentSchema.methods.toJSON = function() {
    const { __v, _id, ...payment  } = this.toObject();
    payment.id = _id;
    return payment;
}

const PaymentModel = mongoose.model('payment', PaymentSchema)

module.exports = PaymentModel;