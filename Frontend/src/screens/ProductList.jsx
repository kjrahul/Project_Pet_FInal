import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FaStore } from "react-icons/fa";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkoutProduct, setCheckoutProduct] = useState(null);
  const [filters, setFilters] = useState({
    searchQuery: "",
    sortByPrice: "",
  });

  const [checkoutDetails, setCheckoutDetails] = useState({
    name: "",
    phoneNumber: "",
    address: "",
    quantity: 1,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const userId = sessionStorage.getItem("userId");
      const response = await axios.get(
        `http://localhost:5000/api/users/${userId}`
      );
      setCheckoutDetails((checkoutDetails) => ({
        ...checkoutDetails,
        name: response.data.name,
        phoneNumber: response.data.phoneNumber,
        address: response.data.address,
      }));
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/products/get-products"
        );
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    fetchUser();
  }, []);

  // ✅ Apply Filters
  const applyFilters = () => {
    let filtered = products;

    // Filter by Product Name
    if (filters.searchQuery) {
      filtered = filtered.filter((product) =>
        product.productName.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }

    // Sort by Price
    if (filters.sortByPrice === "highToLow") {
      filtered = [...filtered].sort((a, b) => b.productPrice - a.productPrice);
    } else if (filters.sortByPrice === "lowToHigh") {
      filtered = [...filtered].sort((a, b) => a.productPrice - b.productPrice);
    }

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [filters]);

  // ✅ Handle Input Changes
  const handleInputChange = (e) => {
    setFilters({ ...filters, searchQuery: e.target.value });
  };

  // ✅ Handle Sort Change
  const handleSortChange = (e) => {
    setFilters({ ...filters, sortByPrice: e.target.value });
  };

  // ✅ Handle Quantity Change
  const handleQuantityChange = (e) => {
    const quantity = parseInt(e.target.value);
    setCheckoutDetails((prev) => ({
      ...prev,
      quantity: quantity > 0 ? quantity : 1,
    }));
  };

  // ✅ Handle Purchase
  const handlePurchase = async () => {
    const userId = sessionStorage.getItem("userId");

    if (!userId) {
      alert("Please log in to continue.");
      navigate("/");
      return;
    }

    if (
      !checkoutDetails.name ||
      !checkoutDetails.phoneNumber ||
      !checkoutDetails.address
    ) {
      alert("Please fill all details.");
      return;
    }

    const totalPrice =
      checkoutDetails.quantity * checkoutProduct.productPrice;

    const payload = {
      userId,
      products: [
        {
          productId: checkoutProduct._id,
          productName: checkoutProduct.productName,
          price: checkoutProduct.productPrice,
          quantity: checkoutDetails.quantity,
        },
      ],
      totalPrice,
      userDetails: {
        name: checkoutDetails.name,
        phoneNumber: checkoutDetails.phoneNumber,
        address: checkoutDetails.address,
      },
      dateOfPurchase: new Date().toISOString(),
    };

    try {
      await axios.post("http://localhost:5000/api/purchase", payload);
      alert("Purchase successful!");
      setCheckoutProduct(null);
      navigate("/products");
    } catch (error) {
      console.error(
        "Failed to complete purchase:",
        error.response?.data || error.message
      );
      alert("Failed to complete purchase. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 p-6">
      <Navbar />
      <div className="text-center mb-10">
        <div className="flex justify-center items-center gap-3 mb-2">
          <FaStore className="text-4xl text-orange-500" />
          <h2 className="text-4xl font-extrabold text-gray-800">Marketplace</h2>
        </div>
        <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto mt-2 rounded-full" />
      </div>

      {/* ✅ Filter Section */}
      {!checkoutProduct && (
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <input
            type="text"
            placeholder="Search by Product Name..."
            className="border p-2 w-72"
            onChange={handleInputChange}
          />
          <select
            className="border p-2 w-48 bg-white"
            onChange={handleSortChange}
            value={filters.sortByPrice}
          >
            <option value="">Sort by Price</option>
            <option value="highToLow">High to Low</option>
            <option value="lowToHigh">Low to High</option>
          </select>
        </div>
      )}

      {!checkoutProduct ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <div key={product._id} className="bg-white shadow-md rounded-lg p-4">
              <img
                src={`http://localhost:5000/${product.image}`}
                alt={product.productName}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-lg font-bold mt-2">{product.productName}</h3>
              <p className="text-sm font-bold text-gray-700">{product.productCompany}</p>
              <p className="font-bold text-orange-600">₹{product.productPrice}</p>
              <p className="text-black">{product.description}</p>
              <button
                onClick={() => setCheckoutProduct(product)}
                className="mt-2 bg-orange-500 text-white w-full py-2 rounded-lg"
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>
      ) : (
        // ✅ Checkout Page with Details
        <div className="max-w-lg mx-auto bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-xl font-bold mb-4">Checkout</h2>
          <img
            src={`http://localhost:5000/${checkoutProduct.image}`}
            alt={checkoutProduct.productName}
            className="w-full h-40 object-cover rounded-md"
          />
          <h3 className="text-lg font-bold mt-2">{checkoutProduct.productName}</h3>
          <p className="text-sm font-bold text-gray-700">{checkoutProduct.productCompany}</p>
          <p className="font-bold text-orange-600">₹{checkoutProduct.productPrice}</p>
          <input
            type="number"
            value={checkoutDetails.quantity}
            onChange={handleQuantityChange}
            className="w-full border p-2 mt-2"
            min="1"
          />
          <p className="mt-2 font-bold">
            Total: ₹{checkoutDetails.quantity * checkoutProduct.productPrice}
          </p>

          <div className="mt-4">
            <label className="block text-sm font-medium">Name:</label>
            <input
              type="text"
              value={checkoutDetails.name}
              onChange={(e) => setCheckoutDetails({ ...checkoutDetails, name: e.target.value })}
              className="w-full border p-2 mt-2"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium">Phone Number:</label>
            <input
              type="text"
              value={checkoutDetails.phoneNumber}
              onChange={(e) => setCheckoutDetails({ ...checkoutDetails, phoneNumber: e.target.value })}
              className="w-full border p-2 mt-2"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium">Address:</label>
            <textarea
              value={checkoutDetails.address}
              onChange={(e) => setCheckoutDetails({ ...checkoutDetails, address: e.target.value })}
              className="w-full border p-2 mt-2"
            />
          </div>

          <button
            onClick={handlePurchase}
            className="bg-orange-500 w-full text-white mt-4 py-2"
          >
            Confirm Purchase
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
