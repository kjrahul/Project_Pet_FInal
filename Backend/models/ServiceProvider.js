const mongoose = require("mongoose");

const serviceProviderSchema = new mongoose.Schema({
  orgName: { type: String, required: true },
  orgLocation: { type: String, required: true },
  orgAddress: { type: String, required: true },
  orgRegId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true, unique: true },
  status: { type: Boolean, default: false },
  userType: { type: String, default: "SP" },
  password: { type: String, required: true },
  username: { type: String, unique: true },
  logo: { type: String } // ✅ Added field for storing logo path
});

module.exports = mongoose.model("ServiceProvider", serviceProviderSchema);
