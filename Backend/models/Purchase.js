const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      productName: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true }, // ✅ Quantity added
    },
  ],
  totalPrice: { type: Number, required: true },
  userDetails: {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
  },
  dateOfPurchase: { type: Date, default: Date.now }, // ✅ Purchase date
  orderStatus: { type: String, default: "Pending" }

});

const Purchase = mongoose.model("Purchase", purchaseSchema);
module.exports = Purchase;
