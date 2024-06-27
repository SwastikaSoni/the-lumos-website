const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.mongoURI;

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB");

        const fetched_data = mongoose.connection.db.collection("products");
        const data = await fetched_data.find({}).toArray();
        const state_date = mongoose.connection.db.collection("shipping");
        const shipping = state_date.find({}).toArray();
        global.products = data;
        global.shipping = shipping;
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
    }
};

module.exports = mongoDB;
