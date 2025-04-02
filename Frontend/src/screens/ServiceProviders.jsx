import { useEffect, useState } from "react";
import axios from "axios";

const ServiceProviders = () => {
  const [pendingProviders, setPendingProviders] = useState([]);
  const [acceptedProviders, setAcceptedProviders] = useState([]);
  const [viewType, setViewType] = useState("all");

  // Fetch All Providers
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

  // Accept Service Provider
  const acceptProvider = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/accept-service-provider/${id}`
      );
      alert("Service provider accepted successfully!");
      fetchAllProviders(); // Refresh list after accepting
    } catch (error) {
      console.error("Failed to accept provider:", error);
      alert("Failed to accept service provider.");
    }
  };

  useEffect(() => {
    fetchAllProviders();
  }, []);

  // Filter Providers Based on View Type
  const displayedProviders =
    viewType === "pending"
      ? pendingProviders
      : viewType === "accepted"
      ? acceptedProviders
      : [...pendingProviders, ...acceptedProviders];

  return (
    <div className="p-5 bg-white rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Service Providers</h2>
        <div>
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
      </div>

      {/* Table for Providers */}
      {displayedProviders.length === 0 ? (
        <p className="text-gray-500 text-center py-10">
          No{" "}
          {viewType === "pending"
            ? "pending"
            : viewType === "accepted"
            ? "accepted"
            : ""}{" "}
          service providers found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="bg-blue-50 text-gray-700">
                <th className="border p-3">S.No</th>
                <th className="border p-3">Logo</th>
                <th className="border p-3">Organization Name</th>
                <th className="border p-3">Location</th>
                <th className="border p-3">Registration ID</th>
                <th className="border p-3">Email</th>
                <th className="border p-3">Phone Number</th>
                <th className="border p-3">Address</th> {/* Moved Address Column */}
                {viewType === "pending" && (
                  <th className="border p-3">Actions</th>
                )}
                <th className="border p-3">License</th> {/* Moved License Column */}
              </tr>
            </thead>
            <tbody>
              {displayedProviders.map((provider, index) => (
                <tr
                  key={provider._id}
                  className="text-center hover:bg-gray-50 transition"
                >
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">
                    <img
                      src={`http://localhost:5000/${provider.logo.replace(
                        /\\/g,
                        "/"
                      )}`}
                      alt="Provider Logo"
                      className="w-16 h-16 object-cover rounded shadow-sm mx-auto"
                    />
                  </td>
                  <td className="p-3">{provider.orgName}</td>
                  <td className="p-3">{provider.orgLocation}</td>
                  <td className="p-3">{provider.orgRegId}</td>
                  <td className="p-3">{provider.email}</td>
                  <td className="p-3">{provider.phoneNumber}</td>
                  <td className="p-3">{provider.orgAddress}</td> {/* Display Address */}
                  {viewType === "pending" && (
                    <td className="p-3">
                      <button
                        onClick={() => acceptProvider(provider._id)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                      >
                        Accept
                      </button>
                    </td>
                  )}
                  <td className="p-3">
                    {provider.license ? (
                      <a
                        href={`http://localhost:5000/${provider.license.replace(
                          /\\/g,
                          "/"
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        View License
                      </a>
                    ) : (
                      <span className="text-gray-400">No License</span>
                    )}
                  </td> {/* Display License */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ServiceProviders;
