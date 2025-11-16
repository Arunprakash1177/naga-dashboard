import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
  const navigate = useNavigate();

  // Hardcoded credentials
  const validUser = {
    username: "admin",
    password: "admin123",
  };

  // Login function
  const login = (username, password) => {
    if (username === validUser.username && password === validUser.password) {
      // Save login state in localStorage (optional)
      localStorage.setItem("isLoggedIn", "true");
      // Redirect to dashboard
      navigate("/Dashboard");
      return true;
    } else {
      return false;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/Login");
  };

  return { login, logout };
}
