import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ViewServices = (props) => {
  const [services, setServices] = useState([]);
  const userId = sessionStorage.getItem("userId"); // ✅ Get userId from sessionStorage

  useEffect(() => {
    if (userId) {
      fetchServices();
    }
  }, [userId]);

  const fetchServices = async () => {
    try {
      // ✅ Fetch services based on userId
      const response = await axios.get(`http://localhost:5000/api/services/view-services/${userId}`);
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to Load",
        text: error.response?.data?.message || "Failed to fetch services.",
      });
    }
  };

  // ✅ Delete Service
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/services/delete-service/${id}`,
        {
          data: { userId }, // ✅ Pass userId in the request body
        }
      );

      Swal.fire({
        icon: "success",
        title: "Service deleted!",
        text: "Service has been removed successfully.",
      });

      // ✅ Refresh after deletion
      fetchServices();
    } catch (error) {
      console.error("Error deleting service:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.response?.data?.message || "Failed to delete service.",
      });
    }
  };

  return (
    <div className="p-5 bg-white rounded-xl shadow-md">
      <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
        {/* Left: Heading */}
        <h2 className="text-2xl font-bold">Services</h2>

        {/* Right: Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => props.onClick()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + Add Service
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="bg-blue-50 text-gray-700">
              <th className="border p-3">Service Name</th>
              <th className="border p-3">Description</th>
              <th className="border p-3">Type</th>
              <th className="border p-3">Price</th>
              <th className="border p-3">Image</th>
              <th className="border p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service._id} className="text-center border-b hover:bg-gray-50 transition">
                <td className="p-3">{service.serviceName}</td>
                <td className="p-3">{service.description?.join(", ")}</td>
                <td className="p-3">{service.serviceType}</td>
                <td className="p-3">₹{service.price}</td>
                <td className="p-3">
                  <img
                    src={`http://localhost:5000/${service.image}`}
                    alt={service.serviceName}
                    className="h-12 w-12 rounded"
                  />
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(service._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {services.length === 0 && (
              <tr>
                <td colSpan="5" className="py-4 text-center text-gray-500">
                  No services added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default ViewServices;
