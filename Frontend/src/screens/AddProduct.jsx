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
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <form 
        onSubmit={handleSubmit} 
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Product Name */}
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="border p-2 rounded"
          required
        />

        {/* Product Price */}
        <input
          type="number"
          placeholder="Product Price"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          className="border p-2 rounded"
          required
        />

        {/* Product Company */}
        <input
          type="text"
          placeholder="Product Company"
          value={productCompany}
          onChange={(e) => setProductCompany(e.target.value)}
          className="border p-2 rounded"
          required
        />

        {/* Description */}
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded col-span-2"
          rows="4"
          required
        ></textarea>

        {/* Image */}
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="border p-2 rounded"
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 col-span-2"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
