const multer = require("multer");
const Service = require("../models/Service");
const Booking = require("../models/ServiceBooking");
const Login = require("../models/Login");
const ServiceProvider = require("../models/ServiceProvider");

const mongoose = require("mongoose");

// Configure Multer for Image Uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/service-images/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Add Service
const addService = async (req, res) => {
  try {
    const { serviceName, description, price, userId } = req.body;

    // ✅ Validation
    if (!serviceName || !description || !price || !req.file || !userId) {
      return res.status(400).json({ message: "All fields are required, including image and user ID" });
    }

    // ✅ Convert userId to ObjectId
    const objectId = new mongoose.Types.ObjectId(userId);

    // ✅ Save new service
    const newService = new Service({
      serviceName,
      description,
      price,
      image: req.file.path,
      serviceProvider: objectId, // ✅ Save as ObjectId
    });

    await newService.save();

    res.status(201).json({ message: "Service added successfully" });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};


// Delete Service
const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body; // ✅ Get userId from body

    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    // ✅ Ensure the service provider is the owner of the post
    if (service.serviceProvider.toString() !== userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await service.deleteOne();

    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: error.message });
  }
};



// View Bookings for a Service Provider
const viewBookings = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // ✅ Find all bookings linked to the logged-in service provider
    const bookings = await Booking.find()
      .populate({
        path: "userId",
        select: "name phoneNumber email",
      })
      .populate({
        path: "serviceId",
        match: { serviceProvider: userId }, // ✅ Filter by provider ID
        select: "serviceName price",
      });

    // ✅ Remove null results (if serviceId doesn't match)
    const filteredBookings = bookings.filter(
      (booking) => booking.serviceId !== null
    );

    res.status(200).json(filteredBookings);
  } catch (error) {
    console.error("❌ Error fetching bookings:", error.message);
    res.status(500).json({ message: error.message });
  }
};



// Accept Booking
const acceptBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { status: "Approved" },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking approved successfully", booking });
  } catch (error) {
    console.error("❌ Error approving booking:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// View Services for a Service Provider
const viewServices = async (req, res) => {
  try {
    const { userId } = req.params;

    // ✅ Fetch services based on provider ID
    const services = await Service.find({ serviceProvider: userId });

    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getServiceProviderDetails = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const serviceProvider = await ServiceProvider.findById(id);

    if (!serviceProvider) {
      return res.status(404).json({ message: "Service provider not found" });
    }

    res.status(200).json(serviceProvider);
  } catch (error) {
    console.error("❌ Error fetching service provider details:", error);
    res.status(500).json({ message: "Failed to fetch service provider details" });
  }
};

module.exports = { addService, viewBookings, acceptBooking, deleteService, upload, viewServices, getServiceProviderDetails };