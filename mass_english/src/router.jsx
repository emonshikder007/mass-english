import { createBrowserRouter } from "react-router-dom";
import App from "./App";

// Pages
import Home from "./pages/Home/Home";
import Courses from "./pages/Courses/Courses";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import VideoPage from "./pages/VideoPage/VideoPage";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Registration";
import AllVideos from "./pages/AllVideos/AllVideos";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/courses",
        element: <Courses />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },

      // 🔥 Dynamic video route like /videos/preposition
      {
        path: "/video",
        element: <AllVideos />,
      },
      {
        path: "/videos/:category",
        element: <VideoPage />,
      },

      // 🔐 Auth pages
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
