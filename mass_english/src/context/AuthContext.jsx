import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [ auth, setAuth ] = useState({
    isLoggedIn: false,
    token: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuth({ isLoggedIn: true, token });
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setAuth({ isLoggedIn: true, token });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuth({ isLoggedIn: false, token: "" });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
