import { useState } from "react";
import { Bell, Moon, Search } from "lucide-react";

const DashboardNavbar = () => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md">
      {/* Search Bar */}
      <div className="relative flex items-center w-80 border rounded-lg px-3 py-2 bg-gray-100">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search or type command..."
          className="ml-2 w-full bg-transparent outline-none text-gray-600"
        />
        <kbd className="ml-2 text-gray-400 text-sm border px-2 py-1 rounded-md bg-gray-200">
          ⌘K
        </kbd>
      </div>

      {/* Icons and Profile */}
      <div className="flex items-center space-x-4">
        <Moon className="w-6 h-6 text-gray-500 cursor-pointer" />
        <Bell className="w-6 h-6 text-gray-500 cursor-pointer" />
        <div className="relative">
          <img
            src="https://via.placeholder.com/40" 
            alt="User"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={() => setUserMenuOpen(!userMenuOpen)}
          />
          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg">
              <p className="p-2 text-gray-700">Profile</p>
              <p className="p-2 text-gray-700">Settings</p>
              <p className="p-2 text-gray-700">Logout</p>
            </div>
          )}
        </div>
        <span className="text-gray-700 font-medium">Musharof ▼</span>
      </div>
    </nav>
  );
}

export default DashboardNavbar;
