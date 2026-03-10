import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  registerStart,
  registerSuccess,
  registerFailure,
} from "../redux/slices/authSlice";
import FormComponent from "../components/FormComponent";
import Loader from "../components/Loader";
import "./RegisterScreen.css";

function RegisterScreen({ onNavigateToLogin }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    // Full name validation
    if (!formData.fullName) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.length < 2) {
      newErrors.fullName = "Name must be at least 2 characters";
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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

    dispatch(registerStart());

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const userData = {
        name: formData.fullName,
        email: formData.email,
      };

      dispatch(registerSuccess(userData));
    } catch (error) {
      console.error("Registration error:", error);
      dispatch(registerFailure("Registration failed. Please try again."));
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1 className="register-title">Create Account</h1>
        <p className="register-subtitle">Sign up to get started</p>

        <form onSubmit={handleSubmit} className="register-form">
          <FormComponent
            type="text"
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            error={errors.fullName}
            disabled={loading}
            required
          />

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
            placeholder="Create a password"
            error={errors.password}
            disabled={loading}
            required
          />

          <FormComponent
            type="password"
            label="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            error={errors.confirmPassword}
            disabled={loading}
            required
          />

          {error && <div className="error-message submit-error">{error}</div>}

          <button type="submit" className="register-button" disabled={loading}>
            {loading ? <Loader size="small" /> : "Create Account"}
          </button>

          <div className="register-footer">
            <span className="signin-text">
              Already have an account?{" "}
              <a
                href="#signin"
                className="signin-link"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateToLogin();
                }}
              >
                Sign in
              </a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterScreen;
