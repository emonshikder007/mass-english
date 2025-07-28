import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Videos = () => {
  const [videos, setVideos] = useState([]);

  const fetchVideos = async () => {
    try {
      const res = await axios.get("https://mass-english-backend.onrender.com/api/admin/videos", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("adminToken"),
        },
      });
      if (res.data.success) {
        setVideos(res.data.videos);
      }
    } catch (err) {
      toast.error("Failed to load videos");
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure to delete this video?");
    if (!confirm) return;

    try {
      const res = await axios.delete(`https://mass-english-backend.onrender.com/admin/video/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("adminToken"),
        },
      });
      if (res.data.success) {
        toast.success("Deleted!");
        setVideos(videos.filter((v) => v._id !== id));
      }
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>All Uploaded Videos</h2>
      {videos.length === 0 ? (
        <p>No videos uploaded yet.</p>
      ) : (
        <div style={{ display: "grid", gap: "20px" }}>
          {videos.map((video) => (
            <div
              key={video._id}
              style={{
                border: "1px solid #ccc",
                padding: "20px",
                borderRadius: "8px",
              }}
            >
              <h4>{video.title}</h4>
              <p>
                <strong>Category:</strong> {video.category}
              </p>
              <video src={video.url} width="400" controls></video>
              <br />
              <button
                onClick={() => handleDelete(video._id)}
                style={{
                  marginTop: "10px",
                  background: "red",
                  color: "white",
                  padding: "5px 10px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Videos;
