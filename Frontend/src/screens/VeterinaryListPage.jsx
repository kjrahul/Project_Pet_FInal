import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { IoSchoolSharp } from "react-icons/io5";
import { GiMedal } from "react-icons/gi";
import Navbar from "../components/Navbar";
import axios from "axios";

const VeterinaryListPage = () => {
  const [vets, setVets] = useState([]);
  const [locationFilter, setLocationFilter] = useState("");
  const [ratings, setRatings] = useState({});

  const navigate = useNavigate();

  // ✅ Fetch Approved Vet Doctors
  useEffect(() => {
    const fetchVetDoctors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/users/vet-doctors/approved"
        );
        setVets(response.data);

        // ✅ Assign Random Ratings (1 to 5) to Each Vet
        const generatedRatings = {};
        response.data.forEach((vet) => {
          generatedRatings[vet._id] = (Math.random() * 4 + 1).toFixed(1); // 1 to 5 range
        });
        setRatings(generatedRatings);
      } catch (error) {
        console.error("Error fetching vet doctors:", error.message);
      }
    };

    fetchVetDoctors();
  }, []);

  // ✅ Filter Clinics Based on Location
  const filteredVets = vets.filter(
    (vet) => locationFilter === "" || vet.location === locationFilter
  );

  // ✅ Navigate to Booking Page
  const handleBookSlot = (vet) => {
    navigate(`/bookvet?id=${vet._id}`);
  };

  // ✅ Generate Star Rating using React Icons
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;

    return (
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={i} className="text-yellow-400" />
        ))}
        {halfStar && <FaStarHalfAlt className="text-yellow-400" />}
        {[...Array(5 - fullStars - (halfStar ? 1 : 0))].map((_, i) => (
          <FaRegStar key={i} className="text-gray-300" />
        ))}
        <span className="ml-1 text-sm text-gray-500">({rating})</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Navbar />

      {/* Title */}
      <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800 relative after:content-[''] after:block after:w-24 after:h-1 after:bg-gradient-to-r after:from-orange-400 after:to-orange-600 after:mx-auto after:mt-2">
        Veterinary Clinics
      </h2>

      {/* Filter Section */}
      <div className="flex justify-end mb-6 gap-4">
        <div>
          <label className="block mb-2 font-medium text-gray-600">
            Filter by Location
          </label>
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="w-40 p-2 border rounded-md text-gray-700 focus:outline-none focus:border-orange-400"
          >
            <option value="">All</option>
            {[...new Set(vets.map((vet) => vet.location))].map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Clinic List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVets.map((vet) => (
          <div
            key={vet._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-transform duration-300 border border-gray-200"
          >
            {/* Logo */}
            <div className="flex justify-center items-center bg-gray-100 p-4">
              <img
                src={`http://localhost:5000/${vet.logo}`}
                alt={vet.name}
                className="w-20 h-20 object-cover rounded-full border border-gray-300"
              />
            </div>

            <div className="p-5">
              {/* Doctor's Name */}
              <h3 className="text-xl font-semibold text-gray-800 truncate">
                {vet.name}
              </h3>
              {/* Email */}
              <p className="text-sm text-gray-500 truncate flex items-center gap-1">
                <MdEmail className="text-orange-500" /> {vet.email}
              </p>
              {/* Qualification */}
              <p className="text-sm text-gray-700 mt-2 flex items-center gap-1">
                <IoSchoolSharp className="text-blue-500" />
                <span className="font-medium">Qualification:</span>{" "}
                {vet.qualification}
              </p>
              {/* Experience */}
              <p className="text-sm text-gray-700 flex items-center gap-1">
                <GiMedal className="text-green-500" />
                <span className="font-medium">Experience:</span>{" "}
                {vet.experience} years
              </p>
              {/* Location */}
              <p className="text-sm text-gray-700 flex items-center gap-1">
                <MdLocationOn className="text-red-500" />
                <span className="font-medium">Location:</span>{" "}
                {vet.location}
              </p>
              {/* Phone Number */}
              <p className="text-sm text-gray-700 flex items-center gap-1">
                <MdPhone className="text-orange-500" />
                <span className="font-medium">Phone:</span>{" "}
                {vet.phoneNumber}
              </p>

              {/* ⭐ Rating */}
              <div className="mt-2">{renderStars(ratings[vet._id])}</div>

              {/* Book Slot Button */}
              <button
                className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-600 transition w-full"
                onClick={() => handleBookSlot(vet)}
              >
                Book Slot
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VeterinaryListPage;
