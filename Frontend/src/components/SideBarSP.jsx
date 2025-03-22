import { useState } from "react";
import { FaBars, FaPlus, FaList, FaClipboard } from "react-icons/fa";

const Sidebar = ({ setActivePage }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-screen bg-gray-800 text-white w-64">
      <div className="p-5 flex items-center justify-between">
        <h1 className="text-xl font-bold">Service Provider</h1>
        <FaBars 
          className="text-2xl cursor-pointer md:hidden" 
          onClick={() => setOpen(!open)} 
        />
      </div>
      <nav className={`${open ? "block" : "hidden"} md:block`}>
        <ul>
          <li
            className="p-4 cursor-pointer hover:bg-gray-700"
            onClick={() => setActivePage("addService")}
          >
            <FaPlus className="inline mr-2" /> Add Service
          </li>

          <li
            className="p-4 cursor-pointer hover:bg-gray-700"
            onClick={() => setActivePage("viewServices")}
          >
            <FaList className="inline mr-2" /> View & Delete Services
          </li>

          <li
            className="p-4 cursor-pointer hover:bg-gray-700"
            onClick={() => setActivePage("viewBookings")}
          >
            <FaClipboard className="inline mr-2" /> View Bookings
          </li>

          
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
