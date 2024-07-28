const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    title: String,
    price: String,
    description: String,
    category: String
})

const ProductModel = mongoose.model("product", productSchema);

module.exports = ProductModel;