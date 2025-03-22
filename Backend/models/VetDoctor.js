const mongoose = require("mongoose");

const vetDoctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: { type: String, required: true },
  address: { type: String, required: true },
  qualification: { type: String, required: true },
  experience: { type: Number, required: true },
  certificate: { type: String, required: true }, // File path of certificate
  logo: { type: String, required: true }, // ✅ Logo path
  phoneNumber: { type: String, required: true, unique: true },
  userType: { type: String, default: "vet" }, // Default user type as Vet
  username: { type: String, unique: true },
  status: { type: Boolean, default: false }, // Initially false
});

module.exports = mongoose.model("VetDoctor", vetDoctorSchema);
