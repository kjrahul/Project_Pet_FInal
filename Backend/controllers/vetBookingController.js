const VetBooking = require("../models/VetBooking");

// Book a Vet
const bookVet = async (req, res) => {
  try {
    const { vetId, userId, petType, ownerName, phoneNumber, location, petDisease, vaccinated, timeOfBooking, address } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const newVetBooking = new VetBooking({
      vetId,
      userId, // ✅ Added userId
      petType,
      ownerName,
      phoneNumber,
      location,
      address,
      petDisease,
      vaccinated,
      timeOfBooking
    });

    await newVetBooking.save();
    res.status(201).json({ message: "Vet booked successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { bookVet };
