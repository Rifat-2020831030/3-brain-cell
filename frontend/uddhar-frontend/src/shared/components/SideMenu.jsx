import PropTypes from 'prop-types';
import { menuItems } from "../data/Data";

const SideMenu = ({ activeTab = "profile", setActiveTab }) => {
  return (
    <div className="w-64 h-screen top-0 bg-gray-300 border-r border-gray-200 sticky z-10">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">Profile</h1>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const classStyle =
              activeTab === item.id
                ? "bg-blue-50 text-blue-600 font-medium"
                : "text-gray-600 hover:bg-gray-100";
                
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center w-full p-3 rounded-lg transition-colors ${classStyle}`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default SideMenu;

SideMenu.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
};
