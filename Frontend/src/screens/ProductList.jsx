import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkoutProduct, setCheckoutProduct] = useState(null);
  const [checkoutDetails, setCheckoutDetails] = useState({
    name: "",
    phoneNumber: "",
    address: "",
    quantity: 1,
  });

  const navigate = useNavigate();

  // ✅ Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products/get-products");
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ✅ Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCheckoutDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Handle quantity change and update total price
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
      navigate("/login");
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
    } catch (error) {
      console.error("Failed to complete purchase:", error.response?.data || error.message);
      alert("Failed to complete purchase. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Navbar />

      {!checkoutProduct ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product._id} className="bg-white shadow-md rounded-lg p-4">
              <img
                src={`http://localhost:5000/${product.image}`}
                alt={product.productName}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-lg font-bold mt-2">{product.productName}</h3>
              <p className="text-gray-600">₹{product.productPrice}</p>
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
        // ✅ Checkout Page
        <div className="max-w-lg mx-auto bg-white p-6 shadow-lg rounded-lg">
          {/* Product Details */}
          <h2 className="text-xl font-bold mb-4">Checkout</h2>
          <p>{checkoutProduct.productName}</p>
          <p>Price: ₹{checkoutProduct.productPrice}</p>
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

          {/* User Details */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleInputChange}
            className="w-full border p-2 mt-4"
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            onChange={handleInputChange}
            className="w-full border p-2 mt-2"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            onChange={handleInputChange}
            className="w-full border p-2 mt-2"
          />

          <button onClick={handlePurchase} className="bg-orange-500 w-full text-white mt-4 py-2">
            Confirm Purchase
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
