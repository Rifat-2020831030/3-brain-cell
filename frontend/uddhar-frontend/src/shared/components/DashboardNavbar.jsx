import { Bell, Moon } from "lucide-react";
import { useState } from "react";
import logo from "../../assets/uddhar.png";
import PropTypes from "prop-types";
import { useAuth } from "../../authentication/context/AuthContext";
import Avatar, { genConfig } from 'react-nice-avatar'
import { useNavigate } from "react-router-dom";

const DashboardNavbar = ({ children, heading }) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const config = genConfig(user.email); 
  const navigate = useNavigate();

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
            <button onClick={()=>{setUserMenuOpen(prev => !prev)}} className="cursor-pointer">
              <Avatar className="w-10 h-10" {...config} />
              <span>{user.email.length > 5 ? `${user.email.slice(0, 5)}...` : ""}</span>
            </button>
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg cursor-pointer z-10">
                <nav className="p-2 text-gray-700 hover:bg-blue-200">Profile</nav>
                <button className="p-2 text-gray-700 hover:bg-blue-200" onClick={()=> navigate(`/dashboard/${user.role}`)}>Dashboard</button>
                <nav className="p-2 text-gray-700 hover:bg-blue-200">Settings</nav>
                <button className="p-2 text-gray-700 hover:bg-blue-200" onClick={logout}>Logout</button>
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
  heading: PropTypes.string,
};