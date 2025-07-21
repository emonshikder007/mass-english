import { useEffect, useState, useContext } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Header.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import AuthModal from "../AuthModel/AuthModel";

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <header>
        <h1
          className="navbar_logo"
          data-aos="fade-right"
          data-aos-duration="1000"
        >
          MASS ENGLISH
        </h1>

        <nav data-aos="zoom-in" data-aos-duration="800">
          <Link to="/" data-aos="fade-left" data-aos-duration="1300">
            Home
          </Link>
          <Link to="/about" data-aos="fade-left" data-aos-duration="1800">
            About
          </Link>
          <Link to="/courses" data-aos="fade-left" data-aos-duration="2300">
            Courses
          </Link>
          <Link to="/contact" data-aos="fade-left" data-aos-duration="2600">
            Contact
          </Link>

          {/*Conditionally show Video link only if logged in */}
          {auth.isLoggedIn && (
            <Link to="/video" data-aos="fade-left" data-aos-duration="3000">
              Videos
            </Link>
          )}

          {auth.isLoggedIn ? (
            <button
              onClick={logout}
              className="nav-btn"
              data-aos="fade-left"
              data-aos-duration="3300"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => setShowModal(true)}
              className="nav-btn"
              data-aos="fade-left"
              data-aos-duration="3300"
            >
              Sign In
            </button>
          )}
        </nav>
      </header>

      {/* Auth Modal */}
      {showModal && <AuthModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default Navbar;
