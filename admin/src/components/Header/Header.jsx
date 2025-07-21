import React, { useContext } from "react";
import { AdminAuthContext } from "../../context/AdminAuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { logout } = useContext(AdminAuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header style={headerStyle}>
      <h1 style={logoStyle}>🎯 Admin Panel</h1>
      <button onClick={handleLogout} style={buttonStyle}>
        Logout
      </button>
    </header>
  );
};

const headerStyle = {
  backgroundColor: "#1e293b",
  color: "#fff",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 30px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
};

const logoStyle = {
  fontSize: "24px",
};

const buttonStyle = {
  backgroundColor: "#ef4444",
  border: "none",
  color: "#fff",
  padding: "8px 16px",
  borderRadius: "5px",
  cursor: "pointer",
};

export default Header;
