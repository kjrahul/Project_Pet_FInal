const express = require("express");
const router = express.Router();
const { getAdoptions , deleteAdoption} = require("../controllers/adoptionController");

// Route to get adoptions with status = 0
router.get("/get-adoptions", getAdoptions);
router.delete("/delete-adoption-request/:id", deleteAdoption);

module.exports = router;
