import { useEffect, useState } from "react";
import axios from "axios";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/admin/orders/${orderId}`, {
        status: newStatus,
      });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, orderStatus: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };
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
    <div className="p-5 bg-white rounded-xl shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Orders List</h2>

      </div>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No orders found.</p>
      ) : (
        <div className="overflow-x-auto">

          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="bg-blue-50 text-gray-700">
                <th className="border p-2">S. No</th>
                <th className="border p-2">User Name</th>
                <th className="border p-2">Phone Number</th>
                <th className="border p-2">Address</th>
                <th className="border p-2">Product Name</th>
                <th className="border p-2">Price (₹)</th>
                <th className="border p-2">Quantity</th>
                <th className="border p-2">Total Price (₹)</th>
                <th className="border p-2">Date of Purchase</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id} className="text-center border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{order.userDetails?.name || 'N/A'}</td>
                  <td className="p-3">{order.userDetails?.phoneNumber || 'N/A'}</td>
                  <td className="p-3">{order.userDetails?.address || 'N/A'}</td>
                  <td className="p-3">{order.products[0]?.productName || 'N/A'}</td>
                  <td className="p-3">₹{order.products[0]?.price ?? 0}</td>
                  <td className="p-3">{order.products[0]?.quantity ?? 0}</td>
                  <td className="p-3 text-green-600 font-semibold">₹{order.totalPrice}</td>
                  <td className="p-3">
                    {new Date(order.dateOfPurchase).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td
                    className={`p-3 font-semibold ${order.orderStatus === "Pending"
                        ? "text-yellow-600"
                        : order.orderStatus === "Packed"
                          ? "text-blue-600"
                          : order.orderStatus === "Dispatched"
                            ? "text-green-600"
                            : "text-gray-600"
                      }`}
                  >
                    {order.orderStatus}
                  </td>

                  <td className="p-3 gap-2">
                    <button
                      onClick={() => updateOrderStatus(order._id, "Packed")}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
                    >
                      Packed
                    </button>
                    <button
                      onClick={() => updateOrderStatus(order._id, "Dispatched")}
                      className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition"
                    >
                      Dispatched
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table></div>
      )}
    </div>
  );
};

export default OrdersList;
