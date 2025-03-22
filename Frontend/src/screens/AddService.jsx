import { useState, useEffect } from "react";
import axios from "axios";

const AddService = () => {
  const [userId, setUserId] = useState(null);
  const [serviceName, setServiceName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  // ✅ Load userId from session storage on component load
  useEffect(() => {
    const storedUserId = sessionStorage.getItem("userId"); // ✅ Get from session storage
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  console.log(userId);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!serviceName || !description || !price || !image || !userId) {
      alert("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("serviceName", serviceName);
    formData.append("description", description);
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
      setDescription("");
      setPrice("");
      setImage(null);
    } catch (error) {
      console.error("Failed to add service:", error);
      alert(error.response?.data?.message || "Failed to add service.");
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Add New Service</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          type="text"
          placeholder="Service Name"
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded col-span-2"
          rows="4"
          required
        ></textarea>

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 col-span-2"
        >
          Add Service
        </button>
      </form>
    </div>
  );
};

export default AddService;
