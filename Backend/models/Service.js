const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  serviceName: { type: String, required: true },
  description: { type: [String], required: true },
  price: { type: String, required: true },
  image: { type: String, required: true },
  serviceProvider: { type: mongoose.Schema.Types.ObjectId, ref: "ServiceProvider", required: false },
  status: { type: String, default: "available" }, // available, booked, completed
  serviceType: { type: String, required: true, enum: ["Grooming", "Boarding", "Walking", "Training"] }, // Modify based on roles

});

module.exports = mongoose.model("Service", serviceSchema);
