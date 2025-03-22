import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // ✅ Get products and totalPrice from navigation state
    if (location.state?.products && location.state?.totalPrice) {
      setProducts(location.state.products);
      setTotalPrice(location.state.totalPrice);
    } else {
      alert("No product selected. Please try again.");
      navigate("/products");
    }
  }, [location.state, navigate]);

  const handleCheckout = async () => {
    alert("Thank you for your purchase!");
    navigate("/products");
  };

  if (!products.length) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-6">Checkout</h2>

      {/* Product List */}
      <div className="mb-4 p-4 border rounded bg-white shadow">
        <h3 className="text-xl font-semibold">Products</h3>
        {products.map((product) => (
          <div key={product.productId} className="flex justify-between border-b py-2">
            <span>{product.productName}</span>
            <span>₹{product.price}</span>
          </div>
        ))}
        <div className="font-bold mt-2">Total: ₹{totalPrice}</div>
      </div>

      {/* Complete Purchase Button */}
      <button
        onClick={handleCheckout}
        className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
      >
        Complete Purchase
      </button>
    </div>
  );
};

export default CheckoutPage;
