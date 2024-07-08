const mongoose = require('mongoose');
const { Schema } = mongoose;

const StateSchema = new Schema({
    state: {
        type: String,
        required: true
    },
    shipping: {
        type: Number,
        required: true
    }
});
module.exports = mongoose.model('state', StateSchema)