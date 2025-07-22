import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AdminAuthContext } from "../../context/AdminAuthContext";

const UploadVideo = () => {
  const { token, admin } = useContext(AdminAuthContext);

  const [form, setForm] = useState({
    title: "",
    category: "",
    file: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "file") {
      setForm({ ...form, file: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.category || !form.file) {
      return toast.error("Please fill in all fields.");
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("category", form.category);
    formData.append("video", form.file);

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/admin/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${admin?.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        toast.success("Video uploaded successfully!");
        setForm({ title: "", category: "", file: null });
      } else {
        toast.error(res.data.message || "Upload failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while uploading.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <h2>📤 Upload Video</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Enter video title"
          style={inputStyle}
          required
        />

        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Enter category name"
          style={inputStyle}
          required
        />

        <input
          type="file"
          name="file"
          accept="video/*"
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <button type="submit" style={buttonStyle} disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};

// ✅ Styles
const containerStyle = {
  maxWidth: "600px",
  margin: "auto",
  padding: "40px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const inputStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  padding: "12px",
  borderRadius: "6px",
  backgroundColor: "#2563eb",
  color: "#fff",
  border: "none",
  cursor: "pointer",
};

export default UploadVideo;
