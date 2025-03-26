import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FaHandsHelping, FaPaw, FaStore, FaUserMd } from "react-icons/fa";

const Homepage = () => {
  const [activeTab, setActiveTab] = useState("Products");
  const navigate = useNavigate();

  return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-blue-200">
      <Navbar/>
      {/* ✅ Logo */}
          <img
            src="/Logo.jpg" // ✅ Update with actual logo path
            alt="Logo"
            className="w-32 h-32 mb-4 rounded-full shadow-lg"
          />
    
          {/* ✅ Welcome Message */}
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
            Welcome to PetSphere!
          </h1>
    
          {/* ✅ Description */}
          <p className="text-gray-600 text-center max-w-md mb-6">
            Your one-stop solution for pet care services. Find vets, adopt pets,
            explore the marketplace, and more!
          </p>
    
          {/* ✅ Services Section */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {/* ✅ Vet Doctors */}
            <button
          onClick={() => navigate("/vetlist")}
           className="p-4 bg-white shadow-lg rounded-xl flex flex-col items-center hover:bg-blue-100 transition cursor-pointer">

              <FaUserMd className="text-5xl text-blue-500 mb-2" />
              <span className="text-lg font-medium text-gray-800">Vet Doctors</span>
              <p className="text-gray-500 text-sm text-center">
                Book appointments with professional veterinarians.
              </p>
            </button>
    
            {/* ✅ Service Providers */}
            <div 
          onClick={() => navigate("/serviceprovidershome")}
          className="p-4 bg-white shadow-lg rounded-xl flex flex-col items-center hover:bg-blue-100 transition cursor-pointer">
              <FaHandsHelping className="text-5xl text-green-500 mb-2" />
              <span className="text-lg font-medium text-gray-800">
                Service Providers
              </span>
              <p className="text-gray-500 text-sm text-center">
                Access pet care services from trusted providers.
              </p>
            </div>
    
            {/* ✅ Marketplace */}
            <div 
          onClick={() => navigate("/products")}
          className="p-4 bg-white shadow-lg rounded-xl flex flex-col items-center hover:bg-blue-100 transition cursor-pointer">
              <FaStore className="text-5xl text-orange-500 mb-2" />
              <span className="text-lg font-medium text-gray-800">
                Marketplace
              </span>
              <p className="text-gray-500 text-sm text-center">
                Buy pet products and essentials.
              </p>
            </div>
    
            {/* ✅ Adoptions */}
            <div
          onClick={() => navigate("/adoptionhome")}
          className="p-4 bg-white shadow-lg rounded-xl flex flex-col items-center hover:bg-blue-100 transition cursor-pointer">
              <FaPaw className="text-5xl text-pink-500 mb-2" />
              <span className="text-lg font-medium text-gray-800">Adoptions</span>
              <p className="text-gray-500 text-sm text-center">
                Give pets a loving home.
              </p>
            </div>
          </div>
    
          {/* ✅ Skip Button */}
        
        </div>

  );
};

export default Homepage;
