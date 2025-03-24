import { useEffect, useState } from "react";
import axios from "axios";

const AdoptionAdmin = (props) => {
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
    <div className="p-5 bg-white rounded-xl shadow-md">
      <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
        {/* Left: Heading */}
        <h2 className="text-2xl font-bold">Adoption</h2>

        {/* Right: Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => props.onClick('addPetAdoption')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + Add Adoption
          </button>
          <button
            onClick={() => props.onClick("adop-request")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Requests
          </button>
        </div>
      </div>

      {adoptions.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No adoptions available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="bg-blue-50 text-gray-700">
                <th className="border p-3">S.No</th>
                <th className="border p-3">Image</th>
                <th className="border p-3">Last 4 Digits of ID</th>
                <th className="border p-3">Pet Type</th>
                <th className="border p-3">Pet Age</th>
                <th className="border p-3">Last Date</th>
                <th className="border p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {adoptions.map((adoption, index) => (
                <tr key={adoption._id} className="text-center border-b hover:bg-gray-50 transition">
                  {/* S.No */}
                  <td className="p-3">{index + 1}</td>

                  {/* ✅ Image */}
                  <td className="p-3">
                    <img
                      src={`http://localhost:5000/${adoption.image}`}
                      alt={adoption.petType}
                      className="w-16 h-16 object-cover rounded shadow-sm mx-auto"
                    />
                  </td>

                  {/* Last 4 Digits of ID */}
                  <td className="p-3">{adoption._id.slice(-4)}</td>

                  {/* Pet Type */}
                  <td className="p-3">{adoption.petType}</td>

                  {/* Pet Age */}
                  <td className="p-3">{adoption.petAge} years</td>

                  {/* Last Date */}
                  <td className="p-3">
                    {new Date(adoption.lastDate).toLocaleDateString()}
                  </td>

                  {/* Actions */}
                  <td className="p-3">
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
        </div>
      )}
    </div>
  );
};

export default AdoptionAdmin;
