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
      ? "https://mass-english-backend.onrender.com/api/user/login"
      : "https://mass-english-backend.onrender.com/api/user/register";

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
        <h2 className="h-l">{isLogin ? "Login" : "Register"}</h2>
        {!isLogin && (
          <input
            type="text"
            placeholder="Name"
            autoComplete="off"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        )}
        <input
          type="email"
          autoComplete="off"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          autoComplete="off"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit">{isLogin ? "Login" : "Register"}</button>

        <p className="xq">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <span
                style={{
                  color: "blue",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                onClick={() => setIsLogin(!isLogin)}
              >
                Register
              </span>
            </>
          ) : (
            <>
              Already a user?{" "}
              <span
                style={{
                  color: "blue",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                onClick={() => setIsLogin(!isLogin)}
              >
                Login
              </span>
            </>
          )}
        </p>
      </form>
      <button onClick={onClose} className="cls">
        ❌
      </button>
    </div>
  );
};

export default AuthModal;
