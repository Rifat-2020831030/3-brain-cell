import { jwtDecode } from "jwt-decode";
import Proptypes from "prop-types";
import { createContext, useContext, useState } from "react";
import { handleLogin, signOut } from "../services/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        const decoded = jwtDecode(token);
        return decoded;
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      signOut();
      return null;
    }
    return {};
  });

  const login = async (email, password) => {
    const response = await handleLogin(email, password);
    if (response.status === "success") {
      const token = response.data.loginToken;
      const decoded = jwtDecode(token);
      setUser(decoded);
      return response;
    }
    return response;
  };

  const logout = () => {
    console.log("Logging out");
    signOut();
    setUser(null);
  };

  const hasRole = (requiredRoles) => {
    if (!user) return false;
    return requiredRoles.includes(user.role);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

AuthProvider.propTypes = {
  children: Proptypes.node.isRequired,
};
