const multer = require("multer");
const Adoption = require("../models/Adoption");
const ServiceProvider = require("../models/ServiceProvider");
const VetDoctor = require("../models/VetDoctor");
const User = require("../models/User");
const Order  = require("../models/Purchase")
const AdoptionRequest = require("../models/AdoptionRequest");

// Configure Multer for Image Uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/adoption-images/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Create Adoption Post
const createAdoptionPost = async (req, res) => {
  try {
    const { petType, petAge, specifications, lastDate } = req.body;

    if (!petType || !petAge || !specifications || !lastDate || !req.file) {
      return res.status(400).json({ message: "All fields are required, including an image" });
    }

    const specificationsArray = specifications.split(",").map(spec => spec.trim()); // Convert to array

    const newAdoption = new Adoption({
      petType,
      petAge,
      specifications: specificationsArray,
      image: req.file.path, // Store file path
      lastDate,
      status: 0 // Initially 0
    });

    await newAdoption.save();

    res.status(201).json({ message: "Adoption post created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    // ✅ Fetch all users from the database
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

// ✅ Get All Service Providers (Accepted + Pending)
const getAllServiceProviders = async (req, res) => {
  try {
    const allProviders = await ServiceProvider.find();
    res.status(200).json(allProviders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get Pending Service Providers (status = false)
const getPendingServiceProviders = async (req, res) => {
    try {
      const pendingProviders = await ServiceProvider.find({ status: false });
      res.status(200).json(pendingProviders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  // Accept Service Provider (Update status to true)
const acceptServiceProvider = async (req, res) => {
    try {
      const { id } = req.params; // Get service provider ID from URL
  
      // Find the service provider by ID
      const serviceProvider = await ServiceProvider.findById(id);
      if (!serviceProvider) {
        return res.status(404).json({ message: "Service provider not found" });
      }
  
      // Update status to true
      serviceProvider.status = true;
      await serviceProvider.save();
  
      res.status(200).json({ message: "Service provider accepted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  // ✅ Get Pending Vets (status = false)
const getPendingVets = async (req, res) => {
  try {
    const pendingVets = await VetDoctor.find({ status: false });
    res.status(200).json(pendingVets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getAllVets = async (req, res) => {
  try {
    const vets = await VetDoctor.find();
    res.status(200).json(vets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ Accept Vet Registration
const acceptVet = async (req, res) => {
  try {
    const { id } = req.params;

    const vet = await VetDoctor.findById(id);
    if (!vet) {
      return res.status(404).json({ message: "Vet not found" });
    }

    vet.status = true;
    await vet.save();

    res.status(200).json({ message: "Vet accepted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalAdoptions = await Adoption.countDocuments();
    const completedAdoptions = await Adoption.countDocuments({ status: 1 });
    const pendingAdoptions = await Adoption.countDocuments({ status: 0 });

    const totalServiceProviders = await ServiceProvider.countDocuments();
    const approvedServiceProviders = await ServiceProvider.countDocuments({ status: true });

    const totalVets = await VetDoctor.countDocuments();
    const approvedVets = await VetDoctor.countDocuments({ status: true });

    res.status(200).json({
      totalUsers,
      totalAdoptions,
      completedAdoptions,
      pendingAdoptions,
      totalServiceProviders,
      approvedServiceProviders,
      totalVets,
      approvedVets,
      
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }); // Sort by latest
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const acceptAdoptionRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const adoptionRequest = await AdoptionRequest.findById(id);
    if (!adoptionRequest) {
      return res.status(404).json({ message: "Adoption request not found" });
    }

    // ✅ Update status to "accepted"
    adoptionRequest.status = "accepted";
    await adoptionRequest.save();

    res.status(200).json({ message: "Adoption request accepted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createAdoptionPost, upload , getPendingServiceProviders , acceptServiceProvider ,getPendingVets , acceptVet
  , getAdminStats ,getOrders, acceptAdoptionRequest ,getAllServiceProviders ,getAllVets , getAllUsers}  ;
