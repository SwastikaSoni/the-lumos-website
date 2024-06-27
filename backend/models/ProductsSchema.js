const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    product_image: {
        type: [String],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    liked: {
        type: Number,
        required: true
    }
});
module.exports = mongoose.model('Product', ProductsSchema)