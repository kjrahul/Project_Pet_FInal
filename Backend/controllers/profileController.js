const User = require("../models/User");
const Purchase = require("../models/Purchase");
const ServiceBooking = require("../models/ServiceBooking");
const VetBooking = require("../models/VetBooking");
const Service = require("../models/Service");
const ServiceProvider = require("../models/ServiceProvider");
const Adoption = require("../models/AdoptionRequest")

const getProfileDetails = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    console.log(`📥 Fetching profile details for userId: ${userId}`);

    // ✅ Fetch User Details
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("✅ User details fetched successfully");

    // ✅ Fetch Purchase History
    let purchases = [];
    try {
      purchases = await Purchase.find({ userId })
        .populate("products.productId", "productName price")
        .sort({ dateOfPurchase: -1 });
      console.log(`✅ Fetched ${purchases.length} purchase(s)`);
    } catch (error) {
      console.error("❌ Error fetching purchase history:", error);
    }

    // ✅ Fetch Accepted Service Provider Bookings
    let acceptedServiceProviderBookings = [];
    try {
      const serviceBookings = await ServiceBooking.find({
        userId,
        // status: "Approved",
      })
        .populate({
          path: "serviceId",
          select: "serviceName price serviceProvider serviceType durationDays",
          populate: {
            path: "serviceProvider",
            model: "ServiceProvider",
            select: "orgName orgLocation orgAddress phoneNumber experience qualification",
          },
        })
        .sort({ createdAt: -1 });

      acceptedServiceProviderBookings = serviceBookings.map((booking) => ({
        serviceName: booking?.serviceId?.serviceName || "N/A",
        serviceType: booking?.serviceId?.serviceType || "N/A",
        durationDays: booking?.serviceId?.durationDays,
        price: booking?.serviceId?.price || "N/A",
        bookingDate: booking?.createdAt,
        serviceProvider: {
          name: booking?.serviceId?.serviceProvider?.orgName || "N/A",
          location: booking?.serviceId?.serviceProvider?.orgLocation || "N/A",
          address: booking?.serviceId?.serviceProvider?.orgAddress || "N/A", // ✅ Added orgAddress
          contact: booking?.serviceId?.serviceProvider?.phoneNumber || "N/A",
          qualification: booking?.serviceId?.serviceProvider?.qualification || "N/A",
          experience: booking?.serviceId?.serviceProvider?.experience || "N/A",
        },
      }));

      console.log(`✅ Fetched ${acceptedServiceProviderBookings.length} accepted service booking(s)`);
    } catch (error) {
      console.error("❌ Error fetching accepted service provider bookings:", error);
    }

    // ✅ Fetch User's Own Service Bookings
    // ✅ Fetch User's Own Service Bookings
    let userServiceBookings = [];
    try {
      userServiceBookings = await ServiceBooking.find({ userId })
        .populate({
          path: "serviceId",
          select: "serviceName price serviceProvider serviceType durationDays",
          populate: {
            path: "serviceProvider",
            model: "ServiceProvider",
            select: "orgName orgAddress orgLocation",
          },
        })
        .sort({ createdAt: -1 });

      console.log(`✅ Fetched ${userServiceBookings.length} user service booking(s)`);
    } catch (error) {
      console.error("❌ Error fetching user service bookings:", error);
    }


    // ✅ Fetch Accepted Vet Bookings
    let acceptedVetBookings = [];
    try {
      acceptedVetBookings = await VetBooking.find({ userId })
        .populate("vetId", "name qualification experience")
        .select("status timeOfBooking petType petDisease")
        .sort({ timeOfBooking: -1 });

      console.log(`✅ Fetched ${acceptedVetBookings.length} accepted vet booking(s)`);
    } catch (error) {
      console.error("❌ Error fetching accepted vet bookings:", error);
    }

    // ✅ Fetch Adoption Details
    let adoptionRequests = [];
    try {
      adoptionRequests = await Adoption.find({ userId })
        .populate("adoptionPostId", "petType petAge lastDate image")
        .sort({ createdAt: -1 });

      console.log(`✅ Fetched ${adoptionRequests.length} adoption request(s)`);
    } catch (error) {
      console.error("❌ Error fetching adoption requests:", error);
    }

    // ✅ Construct Profile Data
    const profileData = {
      user: {
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address || "N/A",
      },
      purchases,
      acceptedServiceProviderBookings,
      acceptedVetBookings,
      userServiceBookings, // ✅ Include user service bookings
      adoptionRequests,
    };

    res.status(200).json(profileData);
  } catch (error) {
    console.error("❌ Failed to fetch profile details:", error);
    res.status(500).json({ message: "Failed to fetch profile details", error: error.message });
  }
};



module.exports = { getProfileDetails };
