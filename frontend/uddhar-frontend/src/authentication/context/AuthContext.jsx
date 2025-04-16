import { jwtDecode } from "jwt-decode";
import Proptypes from "prop-types";
import { createContext, useContext, useState, useMemo, useCallback } from "react";
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

  const login = useCallback(async (email, password) => {
    const response = await handleLogin(email, password);
    if (response.status) {
      const token = response.data.loginToken;
      const decoded = jwtDecode(token);
      setUser(decoded);
      return response;
    }
    return {
      status: false,
      message: response.message || "Login failed",
    }
  }, []);

  const logout = useCallback(() => {
    console.log("Logging out");
    signOut();
    setUser(null);
  }, [setUser]);

  const hasRole = useCallback((requiredRoles) => {
    if (!user) return false;
    return requiredRoles.includes(user.role);
  }, [user]);
  
  // Memoize the context value to avoid unnecessary re-renders
  // and to ensure that the context value is stable across renders
  const contextValue = useMemo(
    () => ({
      user,
      login,
      logout,
      hasRole
    }),
    [user, login, logout, hasRole]
  );

  return (
    <AuthContext.Provider value={contextValue}>
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
