const express = require("express");
const { createAdoptionPost, upload ,getPendingServiceProviders, acceptServiceProvider,getPendingVets, acceptVet , getAdminStats 
    ,getOrders , acceptAdoptionRequest ,getAllServiceProviders, getAllVets , getAllUsers,
    updateOrderStatus} = require("../controllers/adminController");

const router = express.Router();

router.post(
    "/create-adoption",
    upload.fields([
      { name: "image", maxCount: 1 },
      { name: "vaccinationCertificate", maxCount: 1 },
    ]),
    createAdoptionPost
  );router.get("/pending-service-providers", getPendingServiceProviders); // Get all pending providers
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
router.patch("/orders/:id", updateOrderStatus);
router.put("/accept-adoption-request/:id", acceptAdoptionRequest);

module.exports = router;
