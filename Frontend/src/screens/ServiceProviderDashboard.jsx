import { useState, useEffect } from "react";
import AddService from "./AddService";
import ViewServices from "./ViewServices";
import ViewBookings from "./ViewBookings";
import Sidebar from "../components/SideBarSP";
import axios from "axios";

const ServiceProviderDashboard = () => {
  const [activePage, setActivePage] = useState("addService");
  const [serviceProvider, setServiceProvider] = useState(null);

  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      const fetchServiceProviderDetails = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/services/service-provider/${userId}`
          );
          setServiceProvider(response.data);
        } catch (error) {
          console.error("Failed to fetch service provider details:", error);
        }
      };
      fetchServiceProviderDetails();
    }
  }, [userId]);

  return (
    <div className="flex h-screen ">
      {/* Sidebar with props */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        serviceProvider={serviceProvider || undefined}
      />

      {/* Main Content */}
      <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-br from-blue-50 to-blue-200 ml-64">

        {/* Page Renderer */}
        {activePage === "addService" && <AddService userId={userId} />}
        {activePage === "viewServices" && <ViewServices userId={userId} onClick={() => setActivePage("addService")} />}
        {activePage === "viewBookings" && <ViewBookings userId={userId} />}
      </div>
    </div>
  );
};

export default ServiceProviderDashboard;
