import { useEffect, useState } from "react";
import axios from "axios";

const AdminProducts = (props) => {
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
    <div className="p-5 bg-white rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">All Products</h2>
        <button
          onClick={() => props.onAdd()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Product
        </button>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No products available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="bg-blue-50 text-gray-700">
                <th className="border p-3">S.No</th>
                <th className="border p-3">Last 4 Digits of ID</th>
                <th className="border p-3">Product Name</th>
                <th className="border p-3">Price (₹)</th>
                <th className="border p-3">Company</th>
                <th className="border p-3">Description</th>
                <th className="border p-3">Image</th>
                <th className="border p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr
                  key={product._id}
                  className="text-center border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{product._id.slice(-4)}</td>
                  <td className="p-3 font-medium">{product.productName}</td>
                  <td className="p-3 text-green-600 font-semibold">
                    ₹{product.productPrice}
                  </td>
                  <td className="p-3">{product.productCompany}</td>
                  <td className="p-3 max-w-xs truncate">{product.description}</td>
                  <td className="p-3">
                    <img
                      src={`http://localhost:5000/${product.image.replace(/\\/g, "/")}`}
                      alt={product.productName}
                      className="w-16 h-16 object-cover rounded shadow-sm mx-auto"
                    />
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
