import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AdminAuthContext = createContext();

const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState({
    isLoggedIn: false,
    token: null,
  });

  

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setAdmin({
        isLoggedIn: true,
        token,
      });
    }
  }, []);


  


  const login = async (email, password) => {
    try {
      const res = await axios.post("https://mass-english-backend.onrender.com/api/admin/login", {
        email,
        password,
      });

      if (res.data.success) {
        localStorage.setItem("adminToken", res.data.token);
        setAdmin({
          isLoggedIn: true,
          token: res.data.token,
        });
        return { success: true };
      } else {
        return { success: false, message: res.data.message };
      }
    } catch (err) {
      return { success: false, message: "Login failed" };
    }
  };

//logout
  const logout = () => {
    localStorage.removeItem("adminToken");
    setAdmin({
      isLoggedIn: false,
      token: null,
    });
  };

  return (
    <AdminAuthContext.Provider value={{ admin, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export default AdminAuthProvider;
