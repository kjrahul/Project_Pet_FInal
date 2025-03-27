import { useState, useEffect } from "react";
import axios from "axios";

const AddService = () => {
  const [userId, setUserId] = useState(null);
  const [serviceName, setServiceName] = useState("");
  const [serviceType, setServiceType] = useState("Grooming");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [specifications, setSpecifications] = useState([]);
  const [spec, setSpec] = useState("");
  // ✅ Load userId from session storage on component load
  useEffect(() => {
    const storedUserId = sessionStorage.getItem("userId"); // ✅ Get from session storage
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  console.log(userId);
  // Handle adding a specification
  const handleAddSpec = () => {
    if (spec.trim()) {
      setSpecifications([...specifications, spec.trim()]);
      setSpec("");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!serviceName || !serviceType || !specifications || !price || !image || !userId) {
      alert("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("serviceName", serviceName);
    formData.append("description", specifications); // Send as JSON string
    formData.append("serviceType", serviceType);
    formData.append("price", price);
    formData.append("image", image);
    formData.append("userId", userId);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/services/add-service",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      alert("Service added successfully!");
      setServiceName("");
      setSpecifications([]);
      setPrice("");
      setImage(null);
    } catch (error) {
      console.error("Failed to add service:", error);
      alert(error.response?.data?.message || "Failed to add service.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-1">
        Add New Service
        {/* <span className="absolute left-0 bottom-0 w-12 h-1 bg-orange-400 rounded"></span> */}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        {/* Service Name */}
        <input
          type="text"
          placeholder="Service Name"
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        {/* Price */}
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        {/* Type Selection */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Service Type
          </label>
          <div className="flex gap-6">
            {["Grooming", "Boarding", "Walking", "Training"].map((typeOption) => (
              <label key={typeOption} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="serviceType"
                  value={typeOption}
                  checked={serviceType === typeOption}
                  onChange={(e) => setServiceType(e.target.value)}
                  required
                />
                <span>{typeOption}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Specifications</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. Blow dry Nail clipping"
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
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Image
          </label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="md:col-span-2 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium transition"
        >
          Add Service
        </button>
      </form>
    </div>

  );
};

export default AddService;
