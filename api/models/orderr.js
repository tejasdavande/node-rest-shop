const mongoose = require("mongoose");

const products = mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    quantity: { type: Number },
    name: { type: String },
  },
  { _id: false }
);

const orderSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    orders: [products],
  },
  { versionKey: false }
);

module.exports = mongoose.model("Order", orderSchema);
