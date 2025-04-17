/*
  Purpose: "Navbar component for the website",
  Functionality: "Displays the Navbar of the website",
*/
import Proptypes from "prop-types";
import { useEffect, useState } from "react";
import Avatar, { genConfig } from "react-nice-avatar";
import { Link, useNavigate } from "react-router-dom";

import cross from "../../assets/cross-icon.svg";
import logo from "../../assets/uddhar.png";

import { useAuth } from "../../authentication/context/AuthContext";
import { navLinks } from "../data/Data";

const Navbar = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const config = genConfig(user?.email || "");
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    if (user === null) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, [user]);

  const handleSignOut = () => {
    logout();
    setIsLoggedIn(false);
    setShowMenu(false);
    setUserMenuOpen(false);
  };

  const signoutLink = (
    <p className="text-lg hover:text-gray-500">
      <button className="cursor-pointer" onClick={handleSignOut}>
        Sign Out
      </button>
    </p>
  );

  const signIn = (
    <>
      <p className="text-lg hover:text-gray-500">
        <button
          className="cursor-pointer"
          onClick={() => {
            navigate("/sign-in");
            setShowMenu(false);
            setUserMenuOpen(false);
          }}
        >
          Sign In
        </button>
      </p>
      <p className="text-lg hover:text-gray-500">
        <button
          className="cursor-pointer"
          onClick={() => {
            navigate("/sign-up");
            setShowMenu(false);
            setUserMenuOpen(false);
          }}
        >
          Sign Up
        </button>
      </p>
    </>
  );

  return (
    <>
      <a className="top-0 left-0 right-0 w-full">
        <div>
          <div className="bg-amber-300 flex justify-between items-center px-15 h-17 max-md:px-7">
            <div>
              <img
                src={logo}
                alt="Logo"
                className="min-w-30 min-h-30 w-30 cursor-pointer"
                onClick={() => navigate("/")}
              />
            </div>
            <div className="flex items-center gap-10 max-lg:hidden">
              {navLinks.map((link, index) => (
                <p key={index} className="text-lg hover:text-gray-500">
                  <Link to={link.path}>{link.name}</Link>
                </p>
              ))}
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => {
                      setUserMenuOpen((prev) => !prev);
                    }}
                    className="cursor-pointer"
                  >
                    <Avatar className="w-10 h-10" {...config} />
                    <span>
                      {user?.email?.length > 5
                        ? `${user.email.slice(0, 5)}...`
                        : ""}
                    </span>
                  </button>
                  {userMenuOpen && (
                    <ul className="absolute right-0 mt-2 w-40 bg-white border rounded-lg z-10 list-none flex flex-col cursor-pointer">
                      <li className="p-2 text-gray-700 hover:bg-blue-200">
                        Profile
                      </li>
                      <li
                        className="p-2 text-gray-700 hover:bg-blue-200"
                        onClick={() => navigate(`/dashboard/${user.role}`)}
                      >
                        Dashboard
                      </li>
                      <li className="p-2 text-gray-700 hover:bg-blue-200">
                        Settings
                      </li>
                      <li
                        className="p-2 text-gray-700 hover:bg-blue-200"
                        onClick={logout}
                      >
                        Logout
                      </li>
                    </ul>
                  )}
                </div>
              ) : (
                signIn
              )}
            </div>
            <button
              onClick={() => setShowMenu(true)}
              className="hidden max-lg:block text-2xl cursor-pointer"
            >
              ☰
            </button>
          </div>
        </div>
      </a>
      {/* Mobile Side Panel */}
      <div
        className={`fixed top-0 right-0 w-50 h-full bg-gray-100 shadow-lg z-30 p-4 transform transition-transform duration-500 ease-in-out 
            ${showMenu ? "translate-x-0" : "translate-x-full"} z-50`}
      >
        {/* translate-x-full (hidden) and translate-x-0 (visible)*/}
        <div className="flex flex-col h-full">
          <img
            src={cross}
            alt="Close"
            width={30}
            height={30}
            className="self-end mb-4 mr-4 cursor-pointer"
            onClick={() => setShowMenu(false)}
          />
          <a className="flex flex-col gap-4">
            {navLinks.map((link, counter = 100) => (
              <p key={counter++} className="text-lg hover:text-gray-500">
                <Link to={link.path} onClick={() => setShowMenu(false)}>
                  {link.name}
                </Link>
              </p>
            ))}
            {isLoggedIn ? signoutLink : signIn}
          </a>
        </div>
      </div>
      <div onClick={() => setUserMenuOpen(false)}>{children}</div>
    </>
  );
};
export default Navbar;

Navbar.propTypes = {
  children: Proptypes.node,
};
