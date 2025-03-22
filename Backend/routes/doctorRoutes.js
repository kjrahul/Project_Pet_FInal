const express = require("express");
const { getVetProfile,
  getVetBookings,
  updateBookingStatus, } = require("../controllers/doctorController");
const router = express.Router();

router.get("/vet-profile/:vetId", getVetProfile);
router.get("/vet-bookings/:vetId", getVetBookings);
router.patch("/update-booking/:bookingId", updateBookingStatus);

module.exports = router;
