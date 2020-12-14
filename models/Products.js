const mongoose = require("mongoose");

const ProductScheme = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  productName: {
    type: String,
    required: true,
  },
  productDetail: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  productImage: {
    type: String,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subcategory: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  views: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Product", ProductScheme);
