const mongoose = require('mongoose');
const { Schema } = mongoose;

const BillSchema = new Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    orderId: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    }
});
module.exports = mongoose.model('bill', BillSchema)