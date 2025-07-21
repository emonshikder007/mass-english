import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AdminAuthContext } from "./context/AdminAuthContext";

const ProtectedRoute = ({ children }) => {
  const { admin } = useContext(AdminAuthContext);

  if (!admin) return <Navigate to="/login" />;
  return children;
};

export default ProtectedRoute;
