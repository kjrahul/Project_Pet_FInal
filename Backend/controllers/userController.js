const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const User = require("../models/User");
const Login = require("../models/Login");
const ServiceProvider = require("../models/ServiceProvider");
const VetDoctor = require("../models/VetDoctor");
const Service = require("../models/Service");

// ✅ Generate Username Function
const generateUsername = (name, phoneNumber, userType) => {
  return `${name.toLowerCase()}_${phoneNumber.slice(-4)}_${userType}`;
};

// ✅ Configure Multer for Certificate and Logo Upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "certificate") {
      cb(null, "uploads/certificates/");
    } else if (file.fieldname === "logo") {
      cb(null, "uploads/logos/"); // ✅ Store service provider logos
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).fields([
  { name: "certificate", maxCount: 1 },
  { name: "logo", maxCount: 1 },
]);


// ✅ Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, phoneNumber, location, password, address } = req.body;
    const userType = "user";

    const existingUser = await User.findOne({ phoneNumber });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    let username = generateUsername(name, phoneNumber, userType);
    let counter = 1;
    while (await User.findOne({ username })) {
      username = `${generateUsername(name, phoneNumber, userType)}_${counter++}`;
    }

    // ✅ Generate manual ObjectId
    const userId = new mongoose.Types.ObjectId();
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      _id: userId,
      name,
      email,
      phoneNumber,
      location,
      userType,
      address,
      password: hashedPassword,
      username,
    });

    await newUser.save();

    // ✅ Save login with the same ID
    const newLogin = new Login({
      _id: userId,
      username,
      userType,
      password: hashedPassword,
    });

    await newLogin.save();

    res.status(201).json({ message: "User registered successfully", username, userId });
  } catch (error) {
    console.error("❌ Error registering user:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Register Service Provider
// ✅ Register Service Provider
const registerServiceProvider = async (req, res) => {
  try {
    const { orgName, orgLocation, orgAddress, orgRegId, email, phoneNumber, password } = req.body;

    // ✅ Ensure logo is uploaded
    if (!orgName || !orgLocation || !orgRegId || !email || !phoneNumber || !password || !req.files["logo"]) {
      console.log(req.files["logo"]);

      return res.status(400).json({ message: "All fields are required including logo" });
    }

    let username = `${orgName.toLowerCase()}_${phoneNumber.slice(-4)}_sp`;
    let counter = 1;
    while (await ServiceProvider.findOne({ username })) {
      username = `${orgName.toLowerCase()}_${phoneNumber.slice(-4)}_sp_${counter++}`;
    }

    // ✅ Generate manual ObjectId
    const spId = new mongoose.Types.ObjectId();
    const hashedPassword = await bcrypt.hash(password, 10);

    const newSP = new ServiceProvider({
      _id: spId,
      orgName,
      orgLocation,
      orgAddress,
      orgRegId,
      email,
      phoneNumber,
      status: false,
      userType: "SP",
      password: hashedPassword,
      username,
      logo: req.files["logo"][0].path, // ✅ Store logo path
    });

    await newSP.save();

    // ✅ Save login with the same ID
    const newLogin = new Login({
      _id: spId,
      username,
      userType: "SP",
      password: hashedPassword,
    });

    await newLogin.save();

    res.status(201).json({
      message: "Service Provider registered successfully",
      username,
      spId,
    });
  } catch (error) {
    console.error("❌ Error registering service provider:", error.message);
    res.status(500).json({ message: error.message });
  }
};



// ✅ Register Veterinary Doctor
// ✅ Register Veterinary Doctor
const registerVetDoctor = async (req, res) => {
  try {
    const { name, email, password, qualification, experience, phoneNumber, location, address } =
      req.body;

    if (
      !name ||
      !email ||
      !password ||
      !location ||
      !qualification ||
      !experience ||
      !phoneNumber ||
      !req.files["certificate"] ||
      !req.files["logo"]
    ) {
      return res.status(400).json({
        message: "All fields are required, including certificate and logo",
      });
    }

    let username = `${name.toLowerCase()}_${phoneNumber.slice(-4)}_vet`;
    let counter = 1;
    while (await VetDoctor.findOne({ username })) {
      username = `${name.toLowerCase()}_${phoneNumber.slice(-4)}_vet_${counter++}`;
    }

    // ✅ Generate manual ObjectId
    const vetId = new mongoose.Types.ObjectId();
    const hashedPassword = await bcrypt.hash(password, 10);

    const newVet = new VetDoctor({
      _id: vetId,
      name,
      email,
      location,
      address,
      password: hashedPassword,
      qualification,
      experience,
      certificate: req.files["certificate"][0].path, // ✅ Store certificate path
      logo: req.files["logo"][0].path, // ✅ Store logo path
      phoneNumber,
      userType: "vet",
      status: false,
      username,
    });

    await newVet.save();

    // ✅ Save login with the same ID
    const newLogin = new Login({
      _id: vetId,
      username,
      userType: "vet",
      password: hashedPassword,
    });

    await newLogin.save();

    res.status(201).json({
      message: "Veterinary Doctor registered successfully",
      username,
      vetId,
    });
  } catch (error) {
    console.error("❌ Error registering veterinary doctor:", error.message);
    res.status(500).json({ message: error.message });
  }
};


// ✅ User Login
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await Login.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // ✅ Generate JWT token
    const token = jwt.sign(
      { username: user.username, userType: user.userType, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      userType: user.userType,
      userId: user._id,
    });
  } catch (error) {
    console.error("❌ Error logging in user:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get User Details
const getUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("❌ Failed to fetch user:", error);
    res.status(500).json({ message: "Failed to fetch user" });
  }
};

// ✅ Get Approved Service Providers
const getApprovedServiceProviders = async (req, res) => {
  try {
    const approvedProviders = await ServiceProvider.find({ status: true });

    const result = await Service.aggregate([
      {
        $group: {
          _id: "$serviceProvider", // group by provider
          serviceTypes: { $addToSet: "$serviceType" } // get unique service types
        }
      }
    ]);

    const data = approvedProviders.map(provider => {
      const matchingService = result.find(service =>
        service._id.toString() === provider._id.toString()
      );
      return {
        ...provider.toObject(),
        servicesProvided: matchingService?.serviceTypes
      };
    });
    // console.log(data);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get Approved Veterinary Doctors
const getApprovedVetDoctors = async (req, res) => {
  try {
    const approvedDoctors = await VetDoctor.find({ status: true }).select(
      "name email qualification experience phoneNumber logo location"
    );

    res.status(200).json(approvedDoctors);
  } catch (error) {
    console.error("❌ Error fetching approved vet doctors:", error.message);
    res.status(500).json({ message: "Failed to fetch vet doctors." });
  }
};

// ✅ Export Controllers
module.exports = {
  registerUser,
  registerServiceProvider,
  registerVetDoctor,
  loginUser,
  getUser,
  getApprovedServiceProviders,
  upload,
  getApprovedVetDoctors
};
