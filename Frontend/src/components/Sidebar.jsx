import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBars,
  FaBox,
  FaUsers,
  FaPaw,
  FaUserMd,
  FaShoppingCart,
  FaSignOutAlt,
  FaHome,
  FaHandsHelping,
} from "react-icons/fa";

const Sidebar = ({ activePage, setActivePage }) => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const menuItems = [
    { label: "Homepage", icon: <FaHome />, page: "stats" },
    { label: "Users", icon: <FaUsers />, page: "userlist" },
    { label: "Service Providers", icon: <FaHandsHelping />, page: "serviceProviders" },
    { label: "Vet Doctors", icon: <FaUserMd />, page: "vetprovider" },
    { label: "Products", icon: <FaBox />, page: "admin-pro" },
    { label: "Orders", icon: <FaShoppingCart />, page: "orderlist" },
    { label: "Adoptions", icon: <FaPaw />, page: "adop-view" },
  ];

  return (
    <div className={`bg-white shadow-md border-r border-gray-200 h-screen w-64 fixed z-40 flex flex-col justify-between`}>
      {/* Logo + Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={"/Logo.jpg"} alt="Logo" className="w-10 h-10 rounded-full" />
          <h2 className="text-lg font-bold text-orange-500 hidden md:block">Admin Panel</h2>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          <FaBars className="text-gray-700" />
        </button>
      </div>

      {/* Navigation */}
      <nav className={`flex-1 ${open ? "block" : "hidden"} md:block`}>
        <ul className="flex flex-col">
          {menuItems.map((item, idx) => (
            <li
              key={idx}
              className={`flex items-center gap-3 px-6 py-3 cursor-pointer transition duration-200 
                ${activePage === item.page
                  ? "bg-orange-500 text-white font-semibold"
                  : "text-gray-700 hover:bg-orange-100"}
              `} onClick={() => setActivePage(item.page)}
            >
              {item.icon}
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
