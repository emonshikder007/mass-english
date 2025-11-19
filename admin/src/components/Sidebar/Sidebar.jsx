// src/components/Sidebar.jsx
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h2 className="logo">Admin Panel</h2>
      <nav>
        <NavLink to="/dashboard" activeclassname="active">Dashboard</NavLink>
        <NavLink to="/upload" activeclassname="active">Upload Video</NavLink>
        <NavLink to="/videos" activeclassname="active">All Videos</NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
