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
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Add Pet Adoption</h2>
      <form 
        onSubmit={handleSubmit} 
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Pet Type (Dropdown) */}
        <select
          value={petType}
          onChange={(e) => setPetType(e.target.value)}
          className="border p-2 rounded"
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

        {/* Pet Age */}
        <input
          type="text"
          placeholder="Pet Age"
          value={petAge}
          onChange={(e) => setPetAge(e.target.value)}
          className="border p-2 rounded"
          required
        />

        {/* Specifications */}
        <div className="col-span-2">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Specification"
              value={spec}
              onChange={(e) => setSpec(e.target.value)}
              className="border p-2 rounded flex-1"
            />
            <button
              type="button"
              onClick={handleAddSpec}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add
            </button>
          </div>
          <ul className="mt-2">
            {specifications.map((s, index) => (
              <li key={index} className="list-disc ml-5 text-sm">
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Image */}
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="border p-2 rounded"
          required
        />

        {/* Last Date */}
        <input
          type="date"
          value={lastDate}
          onChange={(e) => setLastDate(e.target.value)}
          className="border p-2 rounded"
          required
        />

     
        

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 col-span-2"
        >
          Add Pet
        </button>
      </form>
    </div>
  );
};

export default AddPetAdoption;
