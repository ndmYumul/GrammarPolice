import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../redux/slices/authSlice";
import FormComponent from "../components/FormComponent";
import Loader from "../components/Loader";
import "./LoginScreen.css";

function LoginScreen({ onNavigateToRegister }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    dispatch(loginStart());

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      const userData = {
        email: formData.email,
        name: formData.email.split("@")[0],
      };
      
      dispatch(loginSuccess(userData));
    } catch (error) {
      console.error("Login error:", error);
      dispatch(loginFailure("Login failed. Please try again."));
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Please sign in to your account</p>

        <form onSubmit={handleSubmit} className="login-form">
          <FormComponent
            type="email"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            error={errors.email}
            disabled={loading}
            required
          />

          <FormComponent
            type="password"
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            error={errors.password}
            disabled={loading}
            required
          />

          {error && (
            <div className="error-message submit-error">{error}</div>
          )}

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? (
              <Loader size="small" />
            ) : (
              "Sign In"
            )}
          </button>

          <div className="login-footer">
            <a href="#forgot" className="forgot-link">
              Forgot password?
            </a>
            <span className="signup-text">
              Don't have an account?{" "}
              <a
                href="#signup"
                className="signup-link"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateToRegister();
                }}
              >
                Sign up
              </a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginScreen;
