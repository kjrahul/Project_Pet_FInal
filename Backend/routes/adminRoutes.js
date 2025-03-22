const express = require("express");
const { createAdoptionPost, upload ,getPendingServiceProviders, acceptServiceProvider,getPendingVets, acceptVet , getAdminStats 
    ,getOrders , acceptAdoptionRequest ,getAllServiceProviders, getAllVets , getAllUsers} = require("../controllers/adminController");

const router = express.Router();

router.post("/create-adoption", upload.single("image"), createAdoptionPost);
router.get("/pending-service-providers", getPendingServiceProviders); // Get all pending providers
router.put("/accept-service-provider/:id", acceptServiceProvider); // Accept a service provider
router.get("/all-service-providers", getAllServiceProviders);
router.get("/all-users", getAllUsers);
//  Get Pending Vets
router.get("/pending-vets", getPendingVets);
router.get("/all-vets", getAllVets);

//  Accept Vet Registration
router.put("/accept-vet/:id", acceptVet);

router.get("/stats", getAdminStats);
router.get("/orders", getOrders);
router.put("/accept-adoption-request/:id", acceptAdoptionRequest);

module.exports = router;
