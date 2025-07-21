import { useState, useRef } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./VideoCard.css";

const VideoCard = ({ video }) => {
  const [likes, setLikes] = useState(video.likes || 0);
  const [comments, setComments] = useState(video.comments || []);
  const [commentText, setCommentText] = useState("");
  const [videoLoaded, setVideoLoaded] = useState(false);

  const videoRef = useRef(null);
  const token = localStorage.getItem("token");

  const handleLike = async () => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/video/like/${video._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) setLikes(res.data.likes);
    } catch (err) {
      console.error("Like failed", err);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:5000/api/video/comment/${video._id}`,
        {
          text: commentText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) {
        setComments(res.data.comments);
        setCommentText("");
      }
    } catch (err) {
      console.error("Comment failed", err);
    }
  };

  const handlePlay = async () => {
    const videoEl = videoRef.current;

    if (videoEl.requestFullscreen) {
      await videoEl.requestFullscreen();
    } else if (videoEl.webkitRequestFullscreen) {
      await videoEl.webkitRequestFullscreen();
    } else if (videoEl.msRequestFullscreen) {
      await videoEl.msRequestFullscreen();
    }

    videoEl.play();
  };

  document.addEventListener("fullscreenchange", () => {
    const videoEl = videoRef.current;
    if (videoEl && !document.fullscreenElement) {
      videoEl.pause();
    }
  });

  return (
    <div className="video-card">
      <div className="video-wrapper">
        {!videoLoaded && (
          <Skeleton height={220} width={"100%"} borderRadius={8} />
        )}
        <video
          ref={videoRef}
          className="main-video"
          src={video.url}
          controls
          onPlay={handlePlay}
          onLoadedData={() => setVideoLoaded(true)}
          style={{ display: videoLoaded ? "block" : "none" }}
        />
      </div>

      {videoLoaded ? (
        <>
          <h4>{video.title}</h4>
          <button onClick={handleLike}>🔥 Like ({likes})</button>

          <form onSubmit={handleComment} className="comment-form">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment"
              required
              className="cmt-box"
            />
            <button type="submit" className="cmt-btn">Post</button>
          </form>

          <ul>
            {comments.map((c, i) => (
              <li key={i}>
                <strong>{c.name}</strong>: {c.text}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <Skeleton height={20} width={300} style={{ marginTop: 10 }} />
          <Skeleton height={35} width={100} style={{ marginTop: 10 }} />
          <Skeleton height={50} width={"100%"} borderRadius={30} style={{ marginTop: 10 }} />
          <Skeleton count={2} height={15} width={"80%"} style={{ marginTop: 8 }} />
        </>
      )}
    </div>
  );
};

export default VideoCard;
