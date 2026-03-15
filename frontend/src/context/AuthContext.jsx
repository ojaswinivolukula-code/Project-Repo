import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const login = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };
  const logout = (token) => {
    localStorage.removeItem("token", token);
    setToken(token);
  };
  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
