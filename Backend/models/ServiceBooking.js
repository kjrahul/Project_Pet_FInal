const mongoose = require("mongoose");

const serviceBookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // ✅ Added userId
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
  petType: { type: String, required: true },
  modeOfService: { type: String, required: true }, // e.g., Online, Home Visit, etc.
  address: { type: String }, // ✅ Added address for Home Visit
  timeSlot: { type: String, required: true }, // ✅ Changed from "timeNeeded" to "timeSlot"
  status: { type: String, default: "pending" } // pending, accepted
});

module.exports = mongoose.model("ServiceBooking", serviceBookingSchema);



  