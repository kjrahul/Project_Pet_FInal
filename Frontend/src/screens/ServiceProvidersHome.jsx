import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { FaStar, FaRegStar, FaMapMarkerAlt, FaEnvelope, FaPhone, FaBuilding, FaHandsHelping } from "react-icons/fa";

const ServiceProvidersPage = () => {
  const navigate = useNavigate();
  const [providers, setProviders] = useState([]);
  const [location, setLocation] = useState("");
  const [serviceType, setServiceType] = useState(""); // Track selected service type
  const [locations, setLocations] = useState([]);
  const serviceTypes = ["Grooming", "Boarding", "Walking", "Training"]; // Track unique service types

  // ✅ Fetch approved providers from the backend
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/service-providers");
        setProviders(response.data);

        // Extract unique locations
        const uniqueLocations = [...new Set(response.data.map((provider) => provider.orgLocation))];
        setLocations(uniqueLocations);

    
      } catch (error) {
        console.error("Failed to fetch service providers:", error);
      }
    };

    fetchProviders();
  }, []);

  const handleShowServices = (provider) => {
    navigate(`/services?id=${provider._id}`);
  };

  // ✅ Filter providers based on location and service type
  const filteredProviders = providers.filter((provider) => {
    const matchesLocation = location === "" || provider.orgLocation === location;
    const matchesService = serviceType === "" || (provider.servicesProvided || []).includes(serviceType);
    return matchesLocation && matchesService;
  });

  // ✅ Generate Dummy Rating (1 to 5)
  const getRating = () => Math.floor(Math.random() * 3) + 3;

  // ✅ Render Rating Stars
  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, index) =>
          index < rating ? (
            <FaStar key={index} className="text-yellow-400" />
          ) : (
            <FaRegStar key={index} className="text-gray-300" />
          )
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 p-6">
      <Navbar />

      <div className="text-center mb-10">
        <div className="flex justify-center items-center gap-3 mb-2">
          <FaHandsHelping className="text-4xl text-orange-500" />
          <h2 className="text-4xl font-extrabold text-gray-800">
            Service Providers
          </h2>
        </div>
        <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto mt-2 rounded-full" />
      </div>

      {/* ✅ Filter Section */}
      <div className="flex justify-end mb-6 gap-4">
        <div>
          <label className="block mb-2 font-medium text-gray-600">Filter by Location</label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-48 p-2 border rounded-md text-gray-700 focus:outline-none focus:border-orange-400"
          >
            <option value="">All</option>
            {locations.map((loc, index) => (
              <option key={index} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-600">Filter by Service Type</label>
          <select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="w-48 p-2 border rounded-md text-gray-700 focus:outline-none focus:border-orange-400"
          >
            <option value="">All</option>
            {serviceTypes.map((service, index) => (
              <option key={index} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ✅ Providers List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProviders.map((provider) => (
          <div
            key={provider._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-transform duration-300 border border-gray-200 p-5"
          >
            {/* ✅ Logo Section */}
            <div className="w-full h-32 bg-gray-100 mb-4 rounded-lg flex items-center justify-center">
              {provider.logo ? (
                <img
                  src={`http://localhost:5000/${provider.logo}`}
                  alt={provider.orgName}
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <span className="text-gray-400">No Logo Available</span>
              )}
            </div>

            {/* ✅ Provider Info */}
            <h3 className="text-xl font-semibold truncate mb-2 text-gray-800">{provider.orgName}</h3>
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <FaMapMarkerAlt className="text-orange-400" />
              <span>{provider.orgLocation}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <FaBuilding className="text-blue-500" />
              <span>{provider.orgAddress || "Not Available"}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <FaEnvelope className="text-green-500" />
              <span>{provider.email}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 mb-3">
              <FaPhone className="text-red-400" />
              <span>{provider.phoneNumber}</span>
            </div>

            {/* ✅ Rating */}
            {/* <div className="mt-2">{renderStars(getRating())}</div> */}

            {/* ✅ Button */}
            <button
              className="mt-4 bg-gradient-to-r from-orange-400 to-orange-600 text-white px-6 py-2 rounded-lg text-sm hover:from-orange-500 hover:to-orange-700 transition shadow-md"
              onClick={() => handleShowServices(provider)}
            >
              Show Services
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceProvidersPage;
