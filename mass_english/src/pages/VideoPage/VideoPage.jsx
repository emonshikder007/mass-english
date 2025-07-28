import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VideoCard from "../../components/VideoCard/VideoCard";
import './VideoPage.css';

const VideoPage = () => {
  const { category } = useParams();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("https://mass-english-backend.onrender.com/api/admin/videos")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const filtered = data.videos.filter(
            (v) => v.category.toLowerCase() === category.toLowerCase()
          );
          setVideos(filtered);
        }
      });
  }, [category]);

  return (
    <div className="video-page">
      <h2>{category.charAt(0).toUpperCase() + category.slice(1)} Videos</h2>
      <div className="video-list">
        {videos.map((video) => (
          <VideoCard key={video._id} video={video} /> // ✅ Use component
        ))}
      </div>
    </div>
  );
};

export default VideoPage;
