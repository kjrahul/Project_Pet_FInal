const express = require("express");
const Adoption = require("../models/Adoption");

// ✅ View Adoptions with status = "Pending"
const getAdoptions = async (req, res) => {
  try {
    const adoptions = await Adoption.find({ status: "0" }); // Updated to "Pending"
    res.status(200).json(adoptions);
  } catch (error) {
    console.error("Error fetching adoptions:", error);
    res.status(500).json({ message: error.message });
  }
};

const deleteAdoption = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAdoption = await Adoption.findByIdAndDelete(id);
    if (!deletedAdoption) {
      return res.status(404).json({ message: "Adoption request not found" });
    }
    res.status(200).json({ message: "Adoption request deleted successfully" });
  } catch (error) {
    console.error("Error deleting adoption request:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAdoptions,deleteAdoption
};
