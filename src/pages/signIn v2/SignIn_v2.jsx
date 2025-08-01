import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Film,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  ArrowRight,
} from "lucide-react";
import OMS from "../../assets/OMS.png";

import "./signIn_v2.scss"; // Assuming you have a CSS file for styles

const SignIn_v2 = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) =>
      setTimeout(resolve, 2000)
    );

    setIsLoading(false);
    // In a real app, handle authentication here
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({
      email: "",
      password: "",
      username: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="auth-header"
        >
          <Link to="/" className="auth-logo">
            {/* <img
              src={OMS}
              alt="One Minute Story Logo"
              className="header__logo-img"
            /> */}
            <span className="brand">One Minute Story</span>
          </Link>
          <h1 className="title">
            {isSignUp ? "Join the Story" : "Welcome Back"}
          </h1>
          <p className="subtitle">
            {isSignUp
              ? "Start your collaborative storytelling journey"
              : "Continue your storytelling adventure"}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="auth-card"
        >
          <div className="auth-card-inner">
            <form onSubmit={handleSubmit} className="form">
              {/* Username */}
              {isSignUp && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label className="form-label">
                    Username
                  </label>
                  <div className="form-field">
                    <User className="form-icon" />
                    <input
                      type="text"
                      required={isSignUp}
                      value={formData.username}
                      onChange={(e) =>
                        handleInputChange(
                          "username",
                          e.target.value
                        )
                      }
                      className="form-input"
                      placeholder="Choose a unique username"
                    />
                  </div>
                </motion.div>
              )}

              {/* Email */}
              <div>
                <label className="form-label">
                  Email Address
                </label>
                <div className="form-field">
                  <Mail className="form-icon" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      handleInputChange(
                        "email",
                        e.target.value
                      )
                    }
                    className="form-input"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="form-label">
                  Password
                </label>
                <div className="form-field">
                  <Lock className="form-icon" />
                  <input
                    type={
                      showPassword ? "text" : "password"
                    }
                    required
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange(
                        "password",
                        e.target.value
                      )
                    }
                    className="form-input"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="password-toggle"
                  >
                    {showPassword ? (
                      <EyeOff className="icon" />
                    ) : (
                      <Eye className="icon" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              {isSignUp && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label className="form-label">
                    Confirm Password
                  </label>
                  <div className="form-field">
                    <Lock className="form-icon" />
                    <input
                      type={
                        showPassword ? "text" : "password"
                      }
                      required
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleInputChange(
                          "confirmPassword",
                          e.target.value
                        )
                      }
                      className="form-input"
                      placeholder="Confirm your password"
                    />
                  </div>
                  {formData.password !==
                    formData.confirmPassword && (
                    <p className="error-text">
                      Passwords do not match
                    </p>
                  )}
                </motion.div>
              )}

              {/* Forgot password */}
              {!isSignUp && (
                <div className="text-end">
                  <button
                    type="button"
                    className="link-accent"
                  >
                    Forgot your password?
                  </button>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={
                  isLoading ||
                  (isSignUp &&
                    formData.password !==
                      formData.confirmPassword)
                }
                className="submit-btn"
              >
                {isLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                      }}
                    >
                      <Film className="icon" />
                    </motion.div>
                    <span>
                      {isSignUp
                        ? "Creating Account..."
                        : "Signing In..."}
                    </span>
                  </>
                ) : (
                  <>
                    <span>
                      {isSignUp
                        ? "Create Account"
                        : "Sign In"}
                    </span>
                    <ArrowRight className="icon" />
                  </>
                )}
              </button>
            </form>

            {/* Terms and Toggle */}
            {isSignUp && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="legal-text"
              >
                <p>
                  By creating an account, you agree to our{" "}
                  <button className="link-accent">
                    Terms of Service
                  </button>{" "}
                  and{" "}
                  <button className="link-accent">
                    Privacy Policy
                  </button>
                </p>
              </motion.div>
            )}

            <div className="toggle-auth">
              <p>
                {isSignUp
                  ? "Already have an account?"
                  : "Don't have an account?"}{" "}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="link-accent bold"
                >
                  {isSignUp ? "Sign In" : "Sign Up"}
                </button>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Social sign in */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="social-login"
        >
          <div className="divider">
            <span>Or continue with</span>
          </div>
          <div className="social-buttons">
            <button className="social-btn google">
              {/* ...svg... */}
              Google
            </button>
            {/* <button className="social-btn github">
            </button> */}
          </div>
        </motion.div>

        {/* Back to home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="back-home"
        >
          <Link to="/" className="link-muted">
            ← Back to OMS
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default SignIn_v2;
