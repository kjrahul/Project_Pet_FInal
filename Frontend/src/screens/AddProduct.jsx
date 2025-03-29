import { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCompany, setProductCompany] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productPrice", productPrice);
    formData.append("productCompany", productCompany);
    formData.append("description", description);
    formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/products/add-product", // ✅ API Endpoint
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // ✅ For handling files
          },
        }
      );
      console.log(response.data);
      alert("Product added successfully!");

      // ✅ Reset form
      setProductName("");
      setProductPrice("");
      setProductCompany("");
      setDescription("");
      setImage(null);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-1">Add Product</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
          <input
            type="text"
            placeholder="Enter product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Product Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Price</label>
          <input
            type="number"
            placeholder="Enter product price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Product Company */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Company</label>
          <input
            type="text"
            placeholder="Enter company name"
            value={productCompany}
            onChange={(e) => setProductCompany(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            placeholder="Enter product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-2 rounded"
            rows="4"
            required
          ></textarea>
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

        {/* Submit Button */}
        <button
          type="submit"
          className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
