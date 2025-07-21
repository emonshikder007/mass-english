import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import { Outlet } from "react-router-dom";
import "./Layout.css";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <>
    <Toaster position="top-center" reverseOrder={false} />
      <div className="layout">
        <Sidebar />
        <div className="main-content">
          <Header />
          <div className="page-content">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
