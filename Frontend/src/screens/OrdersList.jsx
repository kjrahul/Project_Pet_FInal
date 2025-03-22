import { useEffect, useState } from "react";
import axios from "axios";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);

  // ✅ Fetch Orders
  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      alert("Failed to load orders.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Orders List</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">S. No</th>
              <th className="border p-2">User Name</th>
              <th className="border p-2">Phone Number</th>
              <th className="border p-2">Address</th>
              <th className="border p-2">Product Name</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Total Price</th>
              <th className="border p-2">Date of Purchase</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id} className="text-center">
                {/* ✅ S. No */}
                <td className="border p-2">{index + 1}</td>

                {/* ✅ User Details */}
                <td className="border p-2">{order.userDetails?.name || "N/A"}</td>
                <td className="border p-2">{order.userDetails?.phoneNumber || "N/A"}</td>
                <td className="border p-2">
                  {order.userDetails?.address || "N/A"}
                </td>

                {/* ✅ Product Details */}
                <td className="border p-2">
                  {order.products[0]?.productName || "N/A"}
                </td>
                <td className="border p-2">
                  ₹{order.products[0]?.price || "0"}
                </td>
                <td className="border p-2">
                  {order.products[0]?.quantity|| "0"}
                </td>


                {/* ✅ Total Price */}
                <td className="border p-2">₹{order.totalPrice || "0"}</td>

                {/* ✅ Date of Purchase */}
                <td className="border p-2">
                  {new Date(order.dateOfPurchase).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrdersList;
