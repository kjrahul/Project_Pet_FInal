const ServiceBooking = require("../models/ServiceBooking");

// ✅ Book a Service
const bookService = async (req, res) => {
  try {
    console.log("Request Body:", req.body); // ✅ Log request body

    const { userId, serviceId, petType, ownerName, phoneNumber, location, modeOfService, timeSlot  ,address, durationDays} = req.body;

    // ✅ Check for missing fields
    if (!userId || !serviceId || !petType || !modeOfService || !timeSlot ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBooking = new ServiceBooking({
      userId,
      serviceId,
      petType,
      ownerName,
      phoneNumber,
      location,
      modeOfService,
      durationDays,
      timeSlot,
      address
    });

    await newBooking.save();

    res.status(201).json({ message: "Service booked successfully!" });
  } catch (error) {
    console.error("Booking Error:", error); // ✅ Log backend error
    res.status(500).json({ message: error.message });
  }
};


module.exports = { bookService };
