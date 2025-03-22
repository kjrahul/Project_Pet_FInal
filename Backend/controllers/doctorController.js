const VetDoctor = require("../models/VetDoctor");
const VetBooking = require("../models/VetBooking");

// ✅ Get Vet Profile
const getVetProfile = async (req, res) => {
  try {
    const { vetId } = req.params;
    const vet = await VetDoctor.findById(vetId);
    res.status(200).json(vet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get Vet Bookings
const getVetBookings = async (req, res) => {
  try {
    const { vetId } = req.params;
    const bookings = await VetBooking.find({ vetId });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update Booking Status
const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    const booking = await VetBooking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    );

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getVetProfile, getVetBookings, updateBookingStatus };
