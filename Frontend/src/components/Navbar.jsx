import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { FiUser } from "react-icons/fi"; // Profile Icon

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false); // Profile dropdown state
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Handle Logout (Kill session)
  const handleLogout = () => {
    sessionStorage.clear(); // Remove all session data
    navigate("/"); // Redirect to login page
  };

  return (
    <>

      <nav className="bg-white shadow-md border-b border-gray-200 fixed top-0 left-0 w-full z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Left Side: Logo + Brand */}
          <div className="flex items-center gap-4">
            <img
              src="/Logo.jpg" // ✅ Update this path if needed
              alt="Logo"
              className="w-12 h-12 rounded-full shadow-lg object-cover"
            />
            <Link to="/" className="text-2xl font-extrabold text-orange-500">
              PetSphere
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            <NavLink to="/home" label="Home" location={location.pathname} />
            <NavLink to="/vetlist" label="Veterinary" location={location.pathname} />
            <NavLink to="/products" label="Marketplace" location={location.pathname} />
            <NavLink to="/adoptionhome" label="Adoptions" location={location.pathname} />
            <NavLink to="/serviceprovidershome" label="Service Providers" location={location.pathname} />

            {/* Profile Icon Dropdown */}
            <div className="relative">
              <FiUser
                size={28}
                className="cursor-pointer text-gray-700 hover:text-orange-500"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              />
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg p-2">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-orange-100 rounded-md"
                  >
                    View Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-orange-100 rounded-md"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-md border-t border-gray-200 absolute top-full left-0 w-full py-4">
            <div className="flex flex-col items-center gap-6">
              <NavLink to="/home" label="Home" location={location.pathname} onClick={() => setIsOpen(false)} />
              <NavLink to="/vetlist" label="Veterinary" location={location.pathname} onClick={() => setIsOpen(false)} />
              <NavLink to="/serviceprovidershome" label="Service Providers" location={location.pathname} onClick={() => setIsOpen(false)} />
              <NavLink to="/products" label="Marketplace" location={location.pathname} onClick={() => setIsOpen(false)} />
              <NavLink to="/adoptionhome" label="Adoptions" location={location.pathname} onClick={() => setIsOpen(false)} />
              <Link
                to="/profile"
                className="text-gray-700 font-medium hover:text-orange-500"
                onClick={() => setIsOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-700 font-medium hover:text-orange-500"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Bottom Padding to Prevent Overlap */}
      <div className="pb-20"></div>
    </>
  );
};

const NavLink = ({ to, label, location, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`text-gray-700 font-medium transition duration-300 hover:text-orange-500 ${location === to ? "border-b-2 border-orange-500" : ""
      }`}
  >
    {label}
  </Link>
);

export default Navbar;
