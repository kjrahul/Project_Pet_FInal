import { useEffect, useState } from "react";
import axios from "axios";

const AdoptionAdmin = () => {
  const [adoptions, setAdoptions] = useState([]);

  // ✅ Fetch Adoption Requests
  const fetchAdoptions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/adoptions/get-adoptions");
      setAdoptions(response.data);
    } catch (error) {
      console.error("Failed to fetch adoptions:", error);
      alert("Failed to load adoptions.");
    }
  };

  // ✅ Delete Adoption Request
  const deleteAdoption = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/adoptions/delete-adoption-request/${id}`);
      alert("Adoption deleted successfully!");
      fetchAdoptions(); // ✅ Refresh list after deletion
    } catch (error) {
      console.error("Failed to delete adoption:", error);
      alert("Failed to delete adoption.");
    }
  };

  useEffect(() => {
    fetchAdoptions();
  }, []);

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">All Adoption Posts</h2>

      {adoptions.length === 0 ? (
        <p className="text-gray-500">No adoptions available.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">S.No</th>
              <th className="border p-2">Image</th>
              <th className="border p-2">Last 4 Digits of ID</th>
              <th className="border p-2">Pet Type</th>
              <th className="border p-2">Pet Age</th>
              <th className="border p-2">Last Date</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {adoptions.map((adoption, index) => (
              <tr key={adoption._id} className="text-center">
                {/* S.No */}
                <td className="border p-2">{index + 1}</td>

                {/* ✅ Image */}
                <td className="border p-2">
                  <img
                    src={`http://localhost:5000/${adoption.image}`}
                    alt={adoption.petType}
                    className="w-16 h-16 object-cover rounded-md border"
                  />
                </td>

                {/* Last 4 Digits of ID */}
                <td className="border p-2">{adoption._id.slice(-4)}</td>

                {/* Pet Type */}
                <td className="border p-2">{adoption.petType}</td>

                {/* Pet Age */}
                <td className="border p-2">{adoption.petAge} years</td>

                {/* Last Date */}
                <td className="border p-2">
                  {new Date(adoption.lastDate).toLocaleDateString()}
                </td>

                {/* Actions */}
                <td className="border p-2">
                  <button
                    onClick={() => deleteAdoption(adoption._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdoptionAdmin;
