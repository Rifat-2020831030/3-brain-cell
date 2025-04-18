/*
  Purpose: "Navbar component for the website",
  Functionality: "Displays the Navbar of the website",
*/
import Proptypes from "prop-types";
import { useEffect, useState, useRef } from "react";
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
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        // usesrMenuRef is the ref for the user menu
        // If the click is outside the user menu, close it
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
      <div className="top-0 left-0 right-0 w-full">
        <div>
          <div className="bg-amber-300 flex justify-between items-center px-15 h-17 max-md:px-7">
            <div>
              <a href="/">
                <img
                  src={logo}
                  alt="Logo"
                  className="min-w-30 min-h-30 w-30 cursor-pointer"
                />
              </a>
            </div>
            <div className="flex items-center gap-10 max-lg:hidden">
              {navLinks.map((link) => (
                <p key={link.path} className="text-lg hover:text-gray-500">
                  <Link to={link.path}>{link.name}</Link>
                </p>
              ))}
              {isLoggedIn ? (
                <div className="relative" ref={userMenuRef}>
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
                    <ul className="absolute right-0 mt-2 w-40 bg-white border rounded-lg z-10 list-none flex flex-col">
                      <li>
                        <button className="w-full text-left p-2 text-gray-700 hover:bg-blue-200 cursor-pointer">
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
      </div>
      {/* Mobile Side Panel */}
      <div
        className={`fixed top-0 right-0 w-50 h-full bg-gray-100 shadow-lg z-30 p-4 transform transition-transform duration-500 ease-in-out 
            ${showMenu ? "translate-x-0" : "translate-x-full"} z-50`}
      >
        {/* translate-x-full (hidden) and translate-x-0 (visible)*/}
        <div className="flex flex-col h-full">
          <button onClick={() => setShowMenu(false)}>
            <img
              src={cross}
              alt="Close"
              width={30}
              height={30}
              className="self-end mb-4 mr-4 cursor-pointer"
            />
          </button>
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <p key={link.path} className="text-lg hover:text-gray-500">
                <Link to={link.path} onClick={() => setShowMenu(false)}>
                  {link.name}
                </Link>
              </p>
            ))}
            {isLoggedIn ? signoutLink : signIn}
          </div>
        </div>
      </div>
      {children}
    </>
  );
};
export default Navbar;

Navbar.propTypes = {
  children: Proptypes.node,
};
