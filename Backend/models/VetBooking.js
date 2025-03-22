const mongoose = require("mongoose");

const vetBookingSchema = new mongoose.Schema({
  vetId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "VetDoctor", // ✅ Correct reference name 
    required: true 
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", // ✅ Reference to the User model 
    required: true 
  },
  petType: { type: String, required: true },
  ownerName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  location: { type: String, required: true },
  petDisease: { type: String, required: true },
  vaccinated: { type: Boolean, required: true },
  timeOfBooking: { type: String, required: true },
  status: { type: String, default: "pending" }
});

module.exports = mongoose.model("VetBooking", vetBookingSchema);
