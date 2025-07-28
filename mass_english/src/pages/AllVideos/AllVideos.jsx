import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AllVideos.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-hot-toast";

const AllVideos = () => {
  const [categories, setCategories] = useState([]);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/videos").then((res) => {
      const data = res.data;
      if (data.success) {
        const uniqueCategories = [
          ...new Set(data.videos.map((v) => v.category)),
        ];
        setCategories(uniqueCategories);
      }
    });
  }, []);

useEffect(() => {
  if (!auth.loading && !auth.isLoggedIn) {
    toast.error("Please login to view videos");
    navigate("/");
  }
}, [auth]);


  return (
    <>
      <div className="video-category-body">
        <div class="overlay"></div>
        <div className="video-category-page">
          <h1 className="video-category-title">Choose a Video Category</h1>
          <div className="video-category-container">
            {categories.map((cat, i) => (
              <Link
                key={i}
                to={`/videos/${cat}`}
                className="video-category-box"
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllVideos;
