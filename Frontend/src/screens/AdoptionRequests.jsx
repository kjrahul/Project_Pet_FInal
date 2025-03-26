import { useEffect, useState } from "react";
import axios from "axios";

const AdoptionRequests = () => {
  const [requests, setRequests] = useState([]);

  // ✅ Fetch Pending Adoption Requests
  const fetchPendingRequests = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/adoptions/adoption-requests/"
      );
      setRequests(response.data);
    } catch (error) {
      console.error("Failed to fetch adoption requests:", error);
      alert("Failed to load adoption requests.");
    }
  };

  // ✅ Accept Adoption Request
  const acceptRequest = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/accept-adoption-request/${id}`
      );
      alert("Adoption request accepted successfully!");
      fetchPendingRequests(); // ✅ Refresh list after accepting
    } catch (error) {
      console.error("Failed to accept request:", error);
      alert("Failed to accept adoption request.");
    }
  };

  // ✅ Download ID Proof
  const downloadIdProof = (filePath) => {
    const fileUrl = `http://localhost:5000/${filePath.replace(/\\/g, "/")}`;
    window.open(fileUrl, "_blank");
  };

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  return (
    <div className="p-5 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Pending Adoption Requests</h2>

      {requests.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No pending adoption requests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="bg-blue-50 text-gray-700">
                {[
                  "S. No",
                  "Image",
                  "User Name",
                  "Phone Number",
                  "Pet ID",
                  "Age",
                  "Other Pets",
                  "Reason",
                  "Status",
                  "Actions",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="border p-3"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {requests.map((request, index) => (
                <tr key={request._id} className="text-center border-b hover:bg-gray-50 transition">
                  {/* ✅ S. No */}
                  <td className="p-3">
                    {index + 1}
                  </td>

                  {/* ✅ Image */}
                  <td className="p-3">
                    {request.adoptionPostId?.image && (
                      <img
                        src={`http://localhost:5000/${request.adoptionPostId.image}`}
                        alt="Pet"
                        className="w-16 h-16 object-cover rounded-md border mx-auto"
                      />
                    )}
                  </td>

                  {/* ✅ User Name */}
                  <td className="p-3">
                    {request.userName}
                  </td>

                  {/* ✅ Phone Number */}
                  <td className="p-3">
                    {request.phoneNumber}
                  </td>

                  {/* ✅ Pet ID */}
                  <td className="p-3">
                    {request.adoptionPostId?._id.slice(-4)}
                  </td>

                  {/* ✅ Age */}
                  <td className="p-3">
                    {request.userAge}
                  </td>

                  {/* ✅ Other Pets */}
                  <td className="p-3">
                    {request.hasOtherPets ? "Yes" : "No"}
                  </td>

                  {/* ✅ Reason */}
                  <td className="p-3 truncate max-w-xs">
                    {request.adoptionReason}
                  </td>

                  {/* ✅ Status */}
                  <td className="p-3 font-semibold">
                    {request.status === "accepted" ? (
                      <span className="text-green-500">Approved</span>
                    ) : request.status === "pending" ? (
                      <span className="text-yellow-500">Pending</span>
                    ) : (
                      <span className="text-red-500">Rejected</span>
                    )}
                  </td>

                  {/* ✅ Actions */}
                  <td className="p-3">
                    <div className="flex justify-center gap-2">
                      {/* Accept Button */}
                      {request.status === "pending" && (
                        <button
                          onClick={() => acceptRequest(request._id)}
                          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                        >
                          Accept
                        </button>
                      )}

                      {/* Download ID Proof Button */}
                      {request.idProof && (

                        <button
                          onClick={() => downloadIdProof(request.idProof)}
                          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                        >
                          Download ID
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdoptionRequests;
