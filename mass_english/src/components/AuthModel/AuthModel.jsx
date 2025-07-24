import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import "./AuthModel.css";

const AuthModal = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isLogin
      ? "http://localhost:5000/api/user/login"
      : "http://localhost:5000/api/user/register";

    try {
      const res = await axios.post(endpoint, form);
      if (res.data.success) {
        login(res.data.token);
        onClose();
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>{isLogin ? "Login" : "Register"}</h2>
        {!isLogin && (
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit">{isLogin ? "Login" : "Register"}</button>

        <p onClick={() => setIsLogin(!isLogin)}>
          {isLogin
            ? "Don't have an account? Register"
            : "Already a user? Login"}
        </p>
      </form>
      <button onClick={onClose} className="cls">❌</button>
    </div>
  );
};

export default AuthModal;
