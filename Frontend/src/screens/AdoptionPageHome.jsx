import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { FaPaw } from "react-icons/fa";

const AdoptionPage = () => {
  const navigate = useNavigate();
  const [adoptions, setAdoptions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch adoption data from API
  useEffect(() => {
    const fetchAdoptions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/adoptions/get-adoptions");
        // ✅ Fix specifications parsing issue
        const formattedData = response.data.map((item) => ({
          ...item,
          specifications: JSON.parse(item.specifications || "[]"), // ✅ Handle stringified JSON
        }));
        setAdoptions(formattedData);
      } catch (error) {
        console.error("Failed to fetch adoptions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdoptions();
  }, []);

  const handleInterested = (pet) => {
    navigate(`/adoptionform?petId=${pet._id}`); // ✅ Pass petId as query parameter
  };

  if (loading) {
    return <div className="text-center mt-20">Loading adoptions...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 p-6 p-6">
      <Navbar />
      <div className="text-center mb-10">
        <div className="flex justify-center items-center gap-3 mb-2">
          <FaPaw className="text-4xl text-orange-500" />
          <h2 className="text-4xl font-extrabold text-gray-800">
            Adoption
          </h2>
        </div>
        <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto mt-2 rounded-full" />
      </div>

      {/* ✅ No Pets Available Message */}
      {adoptions.length === 0 ? (
        <div className="text-center text-gray-500 text-lg font-semibold mt-10">
          Currently no pets available for adoption.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {adoptions.map((pet) => (
            <div
              key={pet._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-transform duration-300 border border-gray-200"
            >
              {/* Image */}
              <div className="w-full aspect-[1/1]">
                <img
                  src={`http://localhost:5000/${pet.image.replace(/\\/g, "/")}`} 
                  alt={pet.petType}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Pet Info */}
              <div className="p-4">
                <h3 className="text-lg font-semibold">{pet.petType}</h3>
                <p className="text-sm text-gray-600">Age: {pet.petAge} years</p>

                {/* Specifications */}
                <ul className="list-disc list-inside mt-2 text-gray-600 text-sm">
                  {pet.specifications.map((spec, index) => (
                    <li key={index} className="truncate">
                      {spec.replace(/^"|"$/g, '')}
                    </li>
                  ))}
                </ul>

                {/* Last Date */}
                <p className="text-sm text-red-500 mt-2">
                  Last Date: {new Date(pet.lastDate).toLocaleDateString()}
                </p>

                {/* Interested Button */}
                <button
                  onClick={() => handleInterested(pet)}
                  className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-600 transition w-full"
                >
                  Interested
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdoptionPage;
