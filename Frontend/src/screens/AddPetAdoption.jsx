import { useState } from "react";
import axios from "axios";

const AddPetAdoption = () => {
  const [petType, setPetType] = useState("");
  const [petAge, setPetAge] = useState("");
  const [specifications, setSpecifications] = useState([]);
  const [spec, setSpec] = useState("");
  const [image, setImage] = useState(null);
  const [lastDate, setLastDate] = useState("");
  const [status, setStatus] = useState(0);

  // Handle adding a specification
  const handleAddSpec = () => {
    if (spec.trim()) {
      setSpecifications([...specifications, spec.trim()]);
      setSpec("");
    }
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("petType", petType);
    formData.append("petAge", petAge);
    formData.append("specifications", JSON.stringify(specifications)); // Send as JSON string
    formData.append("image", image);
    formData.append("lastDate", lastDate);
    formData.append("status", status);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/create-adoption", // API Endpoint
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // For handling files
          },
        }
      );
      console.log(response.data);
      alert("Pet adoption details added successfully!");

      // Reset form after submission
      setPetType("");
      setPetAge("");
      setSpecifications([]);
      setImage(null);
      setLastDate("");
      setStatus(0);
    } catch (error) {
      console.error("Error adding pet adoption:", error);
      alert("Failed to add pet adoption. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-1">Add Pet Adoption</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Pet Type Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Pet Type</label>
          <select
            value={petType}
            onChange={(e) => setPetType(e.target.value)}
            className="w-full border p-2 rounded"
            required
          >
            <option value="" disabled>Select Pet Type</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Bird">Bird</option>
            <option value="Rabbit">Rabbit</option>
            <option value="Fish">Fish</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Pet Age */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Pet Age</label>
          <input
            type="text"
            placeholder="e.g. 2 years"
            value={petAge}
            onChange={(e) => setPetAge(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Specifications with Add Option */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Specifications</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. Vaccinated"
              value={spec}
              onChange={(e) => setSpec(e.target.value)}
              className="flex-1 border p-2 rounded"
            />
            <button
              type="button"
              onClick={handleAddSpec}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Add
            </button>
          </div>
          <ul className="mt-2 list-disc list-inside text-sm text-gray-600">
            {specifications.map((s, index) => (
              <li key={index}>{s}</li>
            ))}
          </ul>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files?.[0])}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Last Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Date for Adoption</label>
          <input
            type="date"
            value={lastDate}
            onChange={(e) => setLastDate(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Add Pet
          </button>
        </div>
      </form>
    </div>

  );
};

export default AddPetAdoption;
