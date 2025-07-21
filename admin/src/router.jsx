import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout/Layout";
import Dashboard from './pages/Dashboard/Dashboard';
import UploadVideo from "./pages/UploadVideo/UploadVideo";
import Videos from "./pages/Videos/Videos";
import Login from "./pages/Login/Login";
import ProtectedRoute from "./ProtectRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "upload",
        element: (
          <ProtectedRoute>
            <UploadVideo />
          </ProtectedRoute>
        ),
      },
      {
        path: "videos",
        element: (
          <ProtectedRoute>
            <Videos />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*", // Catch-all route for 404s
    element: (
      <div style={{ padding: "100px", textAlign: "center" }}>
        <h2>404 | Page Not Found</h2>
        <p>This route does not exist.</p>
      </div>
    ),
  },
]);

export default router;
