import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../api';
import "./log.css"
const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Pass the form data to backend
      await api.post("/auth/register", form);
      alert("User Registered Successfully......."); 
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.msg || "Error registering User");
    }
  }

  return (
    <div className="login-container">
      <div className="paper">
        <h1>Register</h1>
        <form onSubmit={handleSubmit} className="form-container">
          <input
            name="name"
            type="text"
            placeholder="Name"
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button type="submit">REGISTER</button>
          <p>
            Registered User? <Link to="/">LOGIN</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Register