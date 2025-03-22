import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserMd, FaStore, FaHandsHelping, FaPaw } from "react-icons/fa";

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Automatically redirect after 5 seconds
    const timer = setTimeout(() => {
      navigate("/login");
    }, 500000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-blue-200">
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
        <div className="p-4 bg-white shadow-lg rounded-xl flex flex-col items-center hover:bg-blue-100 transition cursor-pointer">
          <FaUserMd className="text-5xl text-blue-500 mb-2" />
          <span className="text-lg font-medium text-gray-800">Vet Doctors</span>
          <p className="text-gray-500 text-sm text-center">
            Book appointments with professional veterinarians.
          </p>
        </div>

        {/* ✅ Service Providers */}
        <div className="p-4 bg-white shadow-lg rounded-xl flex flex-col items-center hover:bg-blue-100 transition cursor-pointer">
          <FaHandsHelping className="text-5xl text-green-500 mb-2" />
          <span className="text-lg font-medium text-gray-800">
            Service Providers
          </span>
          <p className="text-gray-500 text-sm text-center">
            Access pet care services from trusted providers.
          </p>
        </div>

        {/* ✅ Marketplace */}
        <div className="p-4 bg-white shadow-lg rounded-xl flex flex-col items-center hover:bg-blue-100 transition cursor-pointer">
          <FaStore className="text-5xl text-orange-500 mb-2" />
          <span className="text-lg font-medium text-gray-800">
            Marketplace
          </span>
          <p className="text-gray-500 text-sm text-center">
            Buy pet products and essentials.
          </p>
        </div>

        {/* ✅ Adoptions */}
        <div className="p-4 bg-white shadow-lg rounded-xl flex flex-col items-center hover:bg-blue-100 transition cursor-pointer">
          <FaPaw className="text-5xl text-pink-500 mb-2" />
          <span className="text-lg font-medium text-gray-800">Adoptions</span>
          <p className="text-gray-500 text-sm text-center">
            Give pets a loving home.
          </p>
        </div>
      </div>

      {/* ✅ Skip Button */}
      <button
        onClick={() => navigate("/login")}
        className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition shadow-md"
      >
        Get Started
      </button>
    </div>
  );
};

export default SplashScreen;
