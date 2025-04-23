import { Bell, Moon } from "lucide-react";
import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import Avatar, { genConfig } from "react-nice-avatar";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/uddhar.png";
import { useAuth } from "../../authentication/context/AuthContext";


const DashboardNavbar = ({ children, heading }) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const config = genConfig(user.email);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    if (userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userMenuOpen]);

  return (
    <>
      <nav className="bg-amber-300 flex justify-between items-center px-15 h-17 max-md:px-7">
        <div>
          <a href="/">
            <img
              src={logo}
              alt="Logo"
              className="min-w-30 min-h-30 w-30 cursor-pointer"
            />
          </a>
        </div>
        <div>
          <h1 className="text-2xl font-semibold">{heading}</h1>
        </div>
        {/* Icons and Profile */}
        { user.role && <div className="flex items-center space-x-7">
          <Moon className="w-6 h-6 text-black cursor-pointer border rounded-full" />
          <Bell className="w-6 h-6 text-black cursor-pointer" />
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => {
                setUserMenuOpen((prev) => !prev);
              }}
              className="cursor-pointer"
            >
              <Avatar className="w-10 h-10" {...config} />
              <span>
                {user.email.length > 5 ? `${user.email.slice(0, 5)}...` : ""}
              </span>
            </button>
            {userMenuOpen && (
              <ul className="absolute right-0 mt-2 w-40 bg-white border rounded-lg z-10 list-none flex flex-col">
                <li>
                  <button className="w-full text-left p-2 text-gray-700 hover:bg-blue-200 cursor-pointer" onClick={()=>navigate("/profile")}>
                    Profile
                  </button>
                </li>

                <li>
                  <button
                    className="w-full text-left p-2 text-gray-700 hover:bg-blue-200 cursor-pointer"
                    onClick={() => navigate(`/dashboard/${user.role}`)}
                  >
                    Dashboard
                  </button>
                </li>

                <li>
                  <button className="w-full text-left p-2 text-gray-700 hover:bg-blue-200 cursor-pointer">
                    Settings
                  </button>
                </li>

                <li>
                  <button
                    className="w-full text-left p-2 text-gray-700 hover:bg-blue-200 cursor-pointer"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>}
      </nav>
      {children}
    </>
  );
};

export default DashboardNavbar;

DashboardNavbar.propTypes = {
  children: PropTypes.node,
  heading: PropTypes.string,
};
