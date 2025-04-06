import { Bell, Moon } from "lucide-react";
import { useState } from "react";
import logo from "../../assets/uddhar.png";
import PropTypes from "prop-types";

const DashboardNavbar = ({ children, heading }) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-amber-300 flex justify-between items-center px-15 h-17 max-md:px-7">
        <div>
          <img
            src={logo}
            alt="Logo"
            className="min-w-30 min-h-30 w-30 cursor-pointer"
            onClick={() => (window.location.href = "/")}
            role="button"
          />
        </div>
        <div>
          <h1 className="text-2xl font-semibold">{heading}</h1>
        </div>
        {/* Icons and Profile */}
        <div className="flex items-center space-x-7">
          <Moon className="w-6 h-6 text-black cursor-pointer border rounded-full" />
          <Bell className="w-6 h-6 text-black cursor-pointer" />
          <div className="relative">
            <img
              src="https://i.pravatar.cc/40?img=4"
              alt="User"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            />
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg cursor-pointer">
                <p className="p-2 text-gray-700 hover:bg-blue-200">Profile</p>
                <p className="p-2 text-gray-700 hover:bg-blue-200">Settings</p>
                <p className="p-2 text-gray-700 hover:bg-blue-200">Logout</p>
              </div>
            )}
          </div>
        </div>
      </nav>
      <div onClick={() => setUserMenuOpen(false)}>{children}</div>
    </>
  );
};

export default DashboardNavbar;

DashboardNavbar.propTypes = {
  children: PropTypes.node.isRequired,
  heading: PropTypes.string,
};