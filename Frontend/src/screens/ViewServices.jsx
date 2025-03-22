import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ViewServices = () => {
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
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">View Services</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Service Name</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Image</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{service.serviceName}</td>
                <td className="py-2 px-4 border-b">{service.description}</td>
                <td className="py-2 px-4 border-b">₹{service.price}</td>
                <td className="py-2 px-4 border-b">
                  <img
                    src={`http://localhost:5000/${service.image}`}
                    alt={service.serviceName}
                    className="h-12 w-12 rounded"
                  />
                </td>
                <td className="py-2 px-4 border-b">
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
