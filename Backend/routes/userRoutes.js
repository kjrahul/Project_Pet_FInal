const express = require("express");
const { registerUser , loginUser , registerServiceProvider , registerVetDoctor ,upload ,getUser ,getApprovedServiceProviders,getApprovedVetDoctors } = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser); // Login API
router.post("/register-sp", upload.fields([{ name: "logo", maxCount: 1 }, { name: "license", maxCount: 1 }]), registerServiceProvider);
router.post("/register-vet", upload.fields([{ name: "logo", maxCount: 1 }, { name: "certificate", maxCount: 1 }]), registerVetDoctor); // Vet Doctor Registration
router.get("/service-providers", getApprovedServiceProviders);
router.get("/vet-doctors/approved", getApprovedVetDoctors);
router.get("/:userId", getUser);


module.exports = router;
