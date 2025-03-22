import { useEffect, useState } from "react";
import axios from "axios";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  // ✅ Fetch Products
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products/get-products");
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      alert("Failed to load products.");
    }
  };

  // ✅ Delete Product
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/delete-product/${id}`);
      alert("Product deleted successfully!");
      fetchProducts(); // ✅ Refresh list after deletion
    } catch (error) {
      console.error("Failed to delete product:", error);
      alert("Failed to delete product.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">All Products</h2>

      {products.length === 0 ? (
        <p className="text-gray-500">No products available.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">S.No</th>
              <th className="border p-2">Last 4 Digits of ID</th>
              <th className="border p-2">Product Name</th>
              <th className="border p-2">Price (₹)</th>
              <th className="border p-2">Company</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Image</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id} className="text-center">
                {/* S.No */}
                <td className="border p-2">{index + 1}</td>

                {/* Last 4 Digits of ID */}
                <td className="border p-2">{product._id.slice(-4)}</td>

                {/* Product Name */}
                <td className="border p-2">{product.productName}</td>

                {/* Price */}
                <td className="border p-2">₹{product.productPrice}</td>

                {/* Company */}
                <td className="border p-2">{product.productCompany}</td>

                {/* Description */}
                <td className="border p-2">{product.description}</td>

                {/* Image */}
                <td className="border p-2">
                  <img
                    src={`http://localhost:5000/${product.image.replace(/\\/g, "/")}`}
                    alt={product.productName}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>

                {/* Actions */}
                <td className="border p-2">
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminProducts;
