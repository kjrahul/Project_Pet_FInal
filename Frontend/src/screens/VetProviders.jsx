import { useEffect, useState } from "react";
import axios from "axios";

const VetProviders = () => {
  const [pendingVets, setPendingVets] = useState([]);
  const [acceptedVets, setAcceptedVets] = useState([]);
  const [viewType, setViewType] = useState("all");

  // ✅ Fetch All Vets
  const fetchAllVets = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/all-vets"
      );
      const pending = response.data.filter((vet) => !vet.status);
      const accepted = response.data.filter((vet) => vet.status);
      setPendingVets(pending);
      setAcceptedVets(accepted);
    } catch (error) {
      console.error("Failed to fetch vets:", error);
      alert("Failed to load vets.");
    }
  };

  // ✅ Accept Vet Registration
  const acceptVet = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/accept-vet/${id}`);
      alert("Vet accepted successfully!");
      fetchAllVets();
    } catch (error) {
      console.error("Failed to accept vet:", error);
      alert("Failed to accept vet.");
    }
  };

  useEffect(() => {
    fetchAllVets();
  }, []);

  // ✅ Filter Based on View Type
  const displayedVets =
    viewType === "pending"
      ? pendingVets
      : viewType === "accepted"
      ? acceptedVets
      : [...pendingVets, ...acceptedVets];

  return (
    <div className="p-5 bg-white rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold mb-4">Vet Doctors</h2>

        {/* ✅ Filter Dropdown */}
        <div className="mb-4">
          <select
            value={viewType}
            onChange={(e) => setViewType(e.target.value)}
            className="p-3 border rounded bg-white"
          >
            <option value="all">View All</option>
            <option value="pending">View Pending</option>
            <option value="accepted">View Accepted</option>
          </select>
        </div>
      </div>

      {/* ✅ Table for Vets */}
      {displayedVets.length === 0 ? (
        <p className="text-gray-500 text-center py-10">
          No {viewType === "pending" ? "pending" : viewType === "accepted" ? "accepted" : ""} vets found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="bg-blue-50 text-gray-700">
                <th className="border p-3">S. No</th>
                <th className="border p-3">Logo</th>
                <th className="border p-3">Name</th>
                <th className="border p-3">Location</th>
                <th className="border p-3">Qualification</th>
                <th className="border p-3">Experience</th>
                <th className="border p-3">Phone Number</th>
                <th className="border p-3">Address</th> {/* New Address Column */}
                <th className="border p-3">Certificate</th>
                {viewType === "pending" && <th className="border p-3">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {displayedVets.map((vet, index) => (
                <tr key={vet._id} className="text-center">
                  {/* ✅ Serial Number */}
                  <td className="border p-3">{index + 1}</td>

                  {/* ✅ Display Logo */}
                  <td className="border p-3">
                    <img
                      src={
                        vet.logo
                          ? `http://localhost:5000/${vet.logo}`
                          : "/placeholder-logo.png"
                      }
                      alt="Vet Logo"
                      className="w-16 h-16 object-cover rounded shadow-sm mx-auto"
                    />
                  </td>
                  <td className="border p-3">{vet.name}</td>
                  <td className="border p-3">{vet.location}</td>
                  <td className="border p-3">{vet.qualification}</td>
                  <td className="border p-3">{vet.experience} years</td>
                  <td className="border p-3">{vet.phoneNumber}</td>

                  {/* ✅ Display Address */}
                  <td className="border p-3">{vet.address}</td> {/* New Address Column */}

                  {/* ✅ Download Certificate */}
                  <td className="border p-3">
                    <a
                      href={`http://localhost:5000/${vet.certificate}`}
                      download
                      className="text-blue-500 hover:underline"
                    >
                      Download
                    </a>
                  </td>

                  {/* ✅ Accept Button for Pending */}
                  {viewType === "pending" && (
                    <td className="border p-3">
                      <button
                        onClick={() => acceptVet(vet._id)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                      >
                        Accept
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default VetProviders;
