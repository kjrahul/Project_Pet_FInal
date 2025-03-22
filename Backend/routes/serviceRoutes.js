const express = require("express");
const {
  upload,
  addService,
  deleteService,
  viewBookings,
  acceptBooking,
  viewServices,
  getServiceProviderDetails
} = require("../controllers/serviceController");



const router = express.Router();
router.use(express.json());

router.post("/add-service", upload.single("image"), addService);
router.delete("/delete-service/:id", deleteService);
router.get("/bookings", viewBookings);
router.put("/bookings/:bookingId/accept", acceptBooking);
router.get("/view-services/:userId", viewServices);
router.get("/service-provider/:id", getServiceProviderDetails);


module.exports = router;
