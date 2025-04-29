import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";
import { createContext, useContext, useState, useMemo, useCallback, useEffect } from "react";
import { handleLogin, signOut } from "../services/auth";

const AuthContext = createContext();

// Token validity check function
const isTokenValid = (decodedToken) => {
  if (!decodedToken?.exp || !decodedToken?.iat) {
    return false;
  }
  const currentTime = Math.floor(Date.now() / 1000);
  
  // 5-minute buffer before actual expiration
  const buffer = 300; 
  const isExpired = currentTime > (decodedToken.exp - buffer);
  const isNotYetValid = currentTime < decodedToken.iat;
  return !isExpired && !isNotYetValid;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        const decoded = jwtDecode(token);
        if (!isTokenValid(decoded)) {
          signOut();
          return null;
        }
        return decoded;
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      signOut();
      return null;
    }
    return null;
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
    window.location.href = "/sign-in";
  }, [setUser]);

  useEffect(() => {
    const checkTokenValidity = () => {
      if (!user) return;
      
      const token = localStorage.getItem("token");
      if (!token) return logout();
  
      try {
        const decoded = jwtDecode(token);
        !isTokenValid(decoded) && logout();
      } catch {
        logout();
      }
    };
  
    checkTokenValidity();
    const interval = setInterval(checkTokenValidity, 60000);
    return () => clearInterval(interval);
  }, [user, logout]);

  // helper function to check token validity
  const isAuthenticated = useCallback(() => {
    return user !== null && isTokenValid(user);
  }, [user]);

  const hasRole = useCallback((requiredRoles) => {
    if (!user || !isTokenValid(user)) return false;
    return requiredRoles.includes(user.role);
  }, [user]);
  
  // Memoize the context value to avoid unnecessary re-renders
  // and to ensure that the context value is stable across renders
  const contextValue = useMemo(
    () => ({
      user,
      login,
      logout,
      hasRole,
      isAuthenticated,
    }),
    [user, login, logout, hasRole, isAuthenticated]
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
  children: PropTypes.node.isRequired,
};
