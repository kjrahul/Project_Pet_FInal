import { useState, useEffect } from "react";
import AddService from "./AddService";
import ViewServices from "./ViewServices";
import ViewBookings from "./ViewBookings";
import Sidebar from "../components/SideBarSP";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ServiceProviderDashboard = () => {
  const [activePage, setActivePage] = useState("addService");
  const [serviceProvider, setServiceProvider] = useState(null);
  

  const navigate = useNavigate();
 
  const userId = sessionStorage.getItem("userId")

  // ✅ Fetch Service Provider Data
  useEffect(() => {
    if (userId) {
      const fetchServiceProviderDetails = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/services/service-provider/${userId}`
          );
          setServiceProvider(response.data);
          console.log(response.data);
          
        } catch (error) {
          console.error("Failed to fetch service provider details:", error);
        }
      };

      fetchServiceProviderDetails();
    }
  }, [userId]);

  // ✅ Handle Logout
  const handleLogout = () => {
    sessionStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar setActivePage={setActivePage} />

      {/* Main Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {/* ✅ Header Section */}
        {serviceProvider && (
          <div className="flex justify-between items-center bg-gray-200 p-4 rounded-lg shadow-md mb-6">
            <div>
              <h2 className="text-xl font-bold">
                {serviceProvider.orgName || "Service Provider"}
              </h2>
              <p className="text-gray-600">
                Phone: {serviceProvider.phoneNumber || "N/A"}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        )}

        {/* ✅ Render Pages */}
        {activePage === "addService" && <AddService userId={userId} />}
        {activePage === "viewServices" && <ViewServices userId={userId} />}
        {activePage === "viewBookings" && <ViewBookings userId={userId} />}
      </div>
    </div>
  );
};

export default ServiceProviderDashboard;
