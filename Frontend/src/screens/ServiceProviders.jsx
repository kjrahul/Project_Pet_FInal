import { useEffect, useState } from "react";
import axios from "axios";

const ServiceProviders = () => {
  const [pendingProviders, setPendingProviders] = useState([]);
  const [acceptedProviders, setAcceptedProviders] = useState([]);
  const [viewType, setViewType] = useState("all");

  // ✅ Fetch All Providers
  const fetchAllProviders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/all-service-providers"
      );
      const pending = response.data.filter((provider) => !provider.status);
      const accepted = response.data.filter((provider) => provider.status);
      setPendingProviders(pending);
      setAcceptedProviders(accepted);
    } catch (error) {
      console.error("Failed to fetch providers:", error);
      alert("Failed to load service providers.");
    }
  };

  // ✅ Accept Service Provider
  const acceptProvider = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/accept-service-provider/${id}`
      );
      alert("Service provider accepted successfully!");
      fetchAllProviders(); // ✅ Refresh list after accepting
    } catch (error) {
      console.error("Failed to accept provider:", error);
      alert("Failed to accept service provider.");
    }
  };

  useEffect(() => {
    fetchAllProviders();
  }, []);

  // ✅ Filter Providers Based on View Type
  const displayedProviders =
    viewType === "pending"
      ? pendingProviders
      : viewType === "accepted"
      ? acceptedProviders
      : [...pendingProviders, ...acceptedProviders];

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Service Providers</h2>

      {/* ✅ Filter Dropdown */}
      <div className="mb-4">
        <select
          value={viewType}
          onChange={(e) => setViewType(e.target.value)}
          className="p-2 border rounded bg-white"
        >
          <option value="all">View All</option>
          <option value="pending">View Pending</option>
          <option value="accepted">View Accepted</option>
        </select>
      </div>

      {/* ✅ Table for Providers */}
      {displayedProviders.length === 0 ? (
        <p className="text-gray-500">
          No {viewType === "pending" ? "pending" : viewType === "accepted" ? "accepted" : ""} service providers found.
        </p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Logo</th>
              <th className="border p-2">Organization Name</th>
              <th className="border p-2">Location</th>
              <th className="border p-2">Registration ID</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone Number</th>
              {viewType === "pending" && <th className="border p-2">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {displayedProviders.map((provider) => (
              <tr key={provider._id} className="text-center">
                <td className="border p-2">
                  <img
                    src={`http://localhost:5000/${provider.logo}`}
                    alt="Provider Logo"
                    className="w-16 h-16 object-cover rounded-full border"
                  />
                </td>
                <td className="border p-2">{provider.orgName}</td>
                <td className="border p-2">{provider.orgLocation}</td>
                <td className="border p-2">{provider.orgRegId}</td>
                <td className="border p-2">{provider.email}</td>
                <td className="border p-2">{provider.phoneNumber}</td>
                {viewType === "pending" && (
                  <td className="border p-2">
                    <button
                      onClick={() => acceptProvider(provider._id)}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                      Accept
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ServiceProviders;
