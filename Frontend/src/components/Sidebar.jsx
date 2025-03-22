import { useState } from "react";
import { 
  FaBars, 
  FaBox, 
  FaUsers, 
  FaPaw, 
  FaUser, 
  FaChartBar, 
  FaShoppingCart, 
  FaSignOutAlt 
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ setActivePage }) => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const handleLogout = () => {
    sessionStorage.clear(); // Remove all session data
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="h-screen bg-gray-800 text-white w-64 flex flex-col justify-between">
      <div>
        {/* ✅ Header Section */}
        <div className="p-5 flex items-center justify-between">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <FaBars 
            className="text-2xl cursor-pointer md:hidden" 
            onClick={() => setOpen(!open)} 
          />
        </div>

        {/* ✅ Navigation Section */}
        <nav className={`${open ? "block" : "hidden"} md:block`}>
          <ul>
            <li
              className="p-4 cursor-pointer hover:bg-gray-700"
              onClick={() => setActivePage("stats")}
            >
              <FaChartBar className="inline mr-2" /> Statistics
            </li>
            <li
              className="p-4 cursor-pointer hover:bg-gray-700"
              onClick={() => setActivePage("addProduct")}
            >
              <FaBox className="inline mr-2" /> Add Product
            </li>
            <li
              className="p-4 cursor-pointer hover:bg-gray-700"
              onClick={() => setActivePage("orderlist")}
            >
              <FaShoppingCart className="inline mr-2" /> Orders List
            </li>
            <li
              className="p-4 cursor-pointer hover:bg-gray-700"
              onClick={() => setActivePage("admin-pro")}
            >
              <FaBox className="inline mr-2" /> View Product
            </li>
            <li
              className="p-4 cursor-pointer hover:bg-gray-700"
              onClick={() => setActivePage("serviceProviders")}
            >
              <FaUsers className="inline mr-2" /> Service Providers
            </li>
            <li
              className="p-4 cursor-pointer hover:bg-gray-700"
              onClick={() => setActivePage("addPetAdoption")}
            >
              <FaPaw className="inline mr-2" /> Add Pet Adoption
            </li>
            <li
              className="p-4 cursor-pointer hover:bg-gray-700"
              onClick={() => setActivePage("adop-view")}
            >
              <FaPaw className="inline mr-2" /> View Adoptions
            </li>
            <li
              className="p-4 cursor-pointer hover:bg-gray-700"
              onClick={() => setActivePage("adop-request")}
            >
              <FaPaw className="inline mr-2" /> View Adoption Requests
            </li>
            <li
              className="p-4 cursor-pointer hover:bg-gray-700"
              onClick={() => setActivePage("vetprovider")}
            >
              <FaUser className="inline mr-2" /> Vet Providers
            </li>
            <li
              className="p-4 cursor-pointer hover:bg-gray-700"
              onClick={() => setActivePage("userlist")}
            >
              <FaUsers className="inline mr-2" /> All Users
            </li>
          </ul>
        </nav>
      </div>

      {/* ✅ Logout Button */}
      <div className="p-5 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          <FaSignOutAlt className="mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
