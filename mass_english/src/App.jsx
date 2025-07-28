// src/App.jsx
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/header/Header";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";

const App = () => {
  const location = useLocation();
  const { auth } = useContext(AuthContext);

  // Check if current path is home
  const isHomePage = location.pathname === "/";

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      
      {/* Show Header only on Home page */}
      {isHomePage && <Navbar isLoggedIn={auth.isLoggedIn} />}
      
      <AnimatePresence mode="wait">
        <Outlet key={location.pathname} />
      </AnimatePresence>
    </>
  );
};

export default App;
