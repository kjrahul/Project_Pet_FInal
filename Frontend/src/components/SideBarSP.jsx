import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBars,
  FaPlus,
  FaList,
  FaClipboard,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import { MdPhone, MdEmail } from "react-icons/md";
import { GiSittingDog, GiDogHouse, GiJumpingDog } from "react-icons/gi";
import { ImScissors } from "react-icons/im";
const Sidebar = ({ activePage, setActivePage, serviceProvider }) => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const menuItems = [
    { label: "Services", icon: <FaList />, page: "viewServices" },
    { label: "Grooming", icon: <ImScissors />, page: "viewGrooming" },
    { label: "Boarding", icon: <GiDogHouse />, page: "viewBoarding" },
    { label: "Walking", icon: <GiSittingDog />, page: "viewWalking" },
    { label: "Training", icon: <GiJumpingDog />, page: "viewTraining" },
  ];

  return (
    <div className="bg-white shadow-md border-r border-gray-200 h-screen w-64 fixed z-40 flex flex-col justify-between">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={"/Logo.jpg"} alt="Logo" className="w-10 h-10 rounded-full" />
          <h2 className="text-lg font-bold text-orange-500 hidden md:block">Service Provider</h2>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          <FaBars className="text-gray-700" />
        </button>
      </div>

      {/* Navigation */}
      <nav className={`flex-1 overflow-y-auto ${open ? "block" : "hidden"} md:block`}>
        <ul className="flex flex-col">
          {menuItems.map((item, idx) => (
            <li
              key={idx}
              className={`flex items-center gap-3 px-6 py-3 cursor-pointer transition duration-200 
                ${activePage === item.page || (item.page === 'viewServices' && activePage === 'addService')
                  ? "bg-orange-500 text-white font-semibold"
                  : "text-gray-700 hover:bg-orange-100"}`}
              onClick={() => setActivePage(item.page)}
            >
              {item.icon}
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </nav>

      {/* Service Provider Details */}
      {serviceProvider && (
        <div className="px-4 py-4 border-t border-orange-200 text-sm text-orange-900 bg-orange-50">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={`http://localhost:5000/${serviceProvider.logo.replace(/\\/g, "/")}`}
              alt="Provider Logo"
              className="w-10 h-10 object-cover rounded-full border border-orange-300 shadow-sm"
            />
            <span className="font-semibold truncate">
              {serviceProvider.orgName || "Service Provider"}
            </span>
          </div>
          <div className="flex flex-col gap-1 text-sm">
            <span className="flex items-center gap-2">
              <MdPhone className="text-orange-500" />
              {serviceProvider.phoneNumber}
            </span>
            <span className="flex items-center gap-2">
              <MdEmail className="text-orange-500" />
              {serviceProvider.email}
            </span>
          </div>
        </div>
      )}


      {/* Logout */}
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
