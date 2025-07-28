// src/App.jsx
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/header/Header";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import "./App.css";

const App = () => {
  const location = useLocation();
  const { auth } = useContext(AuthContext);

  // Check if current path is home
  const isHomePage = location.pathname === "/";

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      {/* Wrap everything inside the layout container */}
      <div className="app-container">
        {/* Show Header only on Home page */}
        {isHomePage && <Navbar isLoggedIn={auth.isLoggedIn} />}

        <AnimatePresence mode="wait">
          <Outlet key={location.pathname} />
        </AnimatePresence>
      </div>
    </>
  );
};

export default App;
