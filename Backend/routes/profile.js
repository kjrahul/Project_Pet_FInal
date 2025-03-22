const express = require("express");
const { getProfileDetails } = require("../controllers/profileController");

const router = express.Router();

// ✅ GET User Profile Details
router.get("/:userId", getProfileDetails);

module.exports = router;
