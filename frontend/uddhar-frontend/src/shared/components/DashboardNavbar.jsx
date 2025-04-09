import { Bell, Moon, Search } from "lucide-react";
import { useState } from "react";
import PropTypes from "prop-types";
import { useAuth } from "../../authentication/context/AuthContext";
import Avatar, { genConfig } from 'react-nice-avatar'

const DashboardNavbar = ({ children }) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const config = genConfig(user.email); 

  return (
    <>
      <nav className="flex items-center justify-between px-10 py-2 bg-amber-200 shadow-md">
        {/* Search Bar */}
        <div className="relative flex items-center w-80 border rounded-lg px-3 py-2 bg-gray-100">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="ml-2 w-full bg-transparent outline-none text-gray-600"
          />
        </div>

        {/* Icons and Profile */}
        <div className="flex items-center space-x-7">
          <Moon className="w-6 h-6 text-black cursor-pointer border rounded-full" />
          <Bell className="w-6 h-6 text-black cursor-pointer" />
          <div className="relative">
            <div onClick={()=>{setUserMenuOpen(prev => !prev)}}>
              <Avatar className="w-10 h-10" {...config} />
              <span>{user.email.length > 5 ? `${user.email.slice(0, 5)}...` : ""}</span>
            </div>
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg cursor-pointer">
                <nav className="p-2 text-gray-700 hover:bg-blue-200">Profile</nav>
                <nav className="p-2 text-gray-700 hover:bg-blue-200">Settings</nav>
                <nav className="p-2 text-gray-700 hover:bg-blue-200" onClick={logout}>Logout</nav>
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
  children: PropTypes.node,
};
