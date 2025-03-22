import { useState } from "react";
import Sidebar from "../components/Sidebar";
import AddProduct from "./AddProduct";
import ServiceProviders from "./ServiceProviders";
import AddPetAdoption from "./AddPetAdoption";
import AdoptionAdmin from "./AdoptionAdmin";
import AdoptionRequests from "./AdoptionRequests";
import AdminProducts from "./AdminProducts";
import VetProviders from "./VetProviders";
import AdminStats from "./AdminStats";
import OrdersList from "./OrdersList";
import UsersList from "./UsersList";

const AdminDashboard = () => {
  const [activePage, setActivePage] = useState("stats");

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar setActivePage={setActivePage} />
      
      {/* Main Content */}
      <div className="flex-1 p-4 overflow-y-auto">
      {activePage === "stats" && <AdminStats />}
        {activePage === "addProduct" && <AddProduct />}
        {activePage === "serviceProviders" && <ServiceProviders />}
        {activePage === "addPetAdoption" && <AddPetAdoption />}
        {activePage === "adop-request" && <AdoptionRequests />}
        {activePage === "adop-view" && <AdoptionAdmin />}
        {activePage === "admin-pro" && <AdminProducts />}
        {activePage === "vetprovider" && <VetProviders />}
        {activePage === "orderlist" && <OrdersList />}
        {activePage === "userlist" && <UsersList />}

      </div>
    </div>
  );
};

export default AdminDashboard;
