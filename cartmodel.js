const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Subschema for products
const productSchema = new Schema({
  productId: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

// Main order schema
const cartSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique : true
  },
  products: [productSchema],
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
