import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Homepage = () => {
  const [activeTab, setActiveTab] = useState("Products");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">

      <Navbar/>
      {/* Top Image Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-6xl">
        <img
          src="/w1.jpg"
          alt="Cat Care"
          className="w-full h-96 mt-16 object-cover rounded-xl shadow-md border-4 border-transparent hover:border-blue-400 transition-all duration-300"
        />
        <img
          src="/w2.jpg"
          alt="Dog Care"
          className="w-full h-96 object-cover rounded-xl shadow-md border-4 border-transparent hover:border-blue-400 transition-all duration-300"
        />
        <img
          src="/w3.jpg"
          alt="Child with Dog"
          className="w-full h-96 mt-16 object-cover rounded-xl shadow-md border-4 border-transparent hover:border-blue-400 transition-all duration-300"
        />
      </div>

      {/* Button Section */}
      <div className="bg-blue-500 p-6 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 shadow-xl w-full max-w-4xl h-96">
        {/* Products Button */}
        <button
          className={`p-3 rounded-xl flex flex-col items-center justify-center shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 ${
            activeTab === "Products" ? "bg-orange-500 text-white border-orange-600" : "bg-white text-gray-800 border-gray-300"
          }`}
          onClick={() => navigate("/products")}
        >
          <img src="/products.jpg" alt="Products" className="w-16 h-16 mb-2 rounded-full" />
          <span className="font-bold text-lg">Products</span>
        </button>

        {/* Service Providers Button */}
        <button
          className={`p-5 rounded-xl flex flex-col items-center justify-center shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 ${
            activeTab === "Service Providers" ? "bg-orange-500 text-white border-orange-600" : "bg-white text-gray-800 border-gray-300"
          }`}
          onClick={() => navigate("/serviceprovidershome")}
        >
          <img src="/groom.jpg" alt="Service Providers" className="w-16 h-16 mb-2 rounded-full" />
          <span className="font-bold text-lg">Service Providers</span>
        </button>

        {/* Veterinary Button */}
        <button
          className={`p-5 rounded-xl flex flex-col items-center justify-center shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 ${
            activeTab === "Veterinary" ? "bg-orange-500 text-white border-orange-600" : "bg-white text-gray-800 border-gray-300"
          }`}
          onClick={() => navigate("/vetlist")}
        >
          <img src="/vet.jpg" alt="Veterinary" className="w-16 h-16 mb-2 rounded-full" />
          <span className="font-bold text-lg">Veterinary</span>
        </button>

        {/* Adoption Button */}
        <button
          className={`p-5 rounded-xl flex flex-col items-center justify-center shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 ${
            activeTab === "Adoption" ? "bg-orange-500 text-white border-orange-600" : "bg-white text-gray-800 border-gray-300"
          }`}
          onClick={() => navigate("/adoptionhome")}
        >
          <img src="/adoption.jpg" alt="Adoption" className="w-16 h-16 mb-2 rounded-full" />
          <span className="font-bold text-lg">Adoption</span>
        </button>
      </div>
    </div>
  );
};

export default Homepage;
