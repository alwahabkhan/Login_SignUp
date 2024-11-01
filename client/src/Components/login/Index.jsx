import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Box, Typography } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const validateEmail = (email) => {
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return validEmail.test(email);
  };

  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    if (!email) {
      tempErrors["email"] = "Email is required";
      isValid = false;
    } else if (!validateEmail(email)) {
      tempErrors["email"] = "Invalid email format";
      isValid = false;
    }

    if (!password) {
      tempErrors["password"] = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      tempErrors["password"] = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/login", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        email,
        password,
      });

      console.log(response);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("firstname", response.data.user.firstname);
      localStorage.setItem("_id", response.data.user._id);
      localStorage.setItem("role", response.data.user.role);

      console.log(localStorage);

      if (response.data.user.role === "Admin") {
        navigate("/admin-dashboard");
      } else if (response.data.user.role === "User") {
        navigate("/user-dashboard");
      } else {
        console.error("Unknown user role:", response.data.user.role);
      }
    } catch (err) {
      if (err.response.data.message) {
        setServerError(err.response.data.message);
      } else {
        setServerError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        background: "linear-gradient(to right, #add8e6, #4682B4)",
        minHeight: "100vh",
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: "500px",
          marginTop: "80px",
          padding: "40px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: "12px",
          backgroundColor: "#fff",
        }}
      >
        <div>
          <Form onSubmit={handleSubmit} style={{ padding: "20px" }}>
            <h1
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                color: "#333",
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              Welcome Back!
            </h1>
            {serverError && (
              <p style={{ color: "red", textAlign: "center" }}>{serverError}</p>
            )}
            <Form.Group className="mb-4">
              <Form.Label style={{ fontSize: "14px", color: "#555" }}>
                Email address
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                isInvalid={!!errors.email}
                style={{
                  padding: "10px",
                  borderRadius: "8px",
                  borderColor: "#ccc",
                  boxShadow: "none",
                }}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label style={{ fontSize: "14px", color: "#555" }}>
                Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                isInvalid={!!errors.password}
                style={{
                  padding: "10px",
                  borderRadius: "8px",
                  borderColor: "#ccc",
                  boxShadow: "none",
                }}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                fontSize: "16px",
                backgroundColor: "#007BFF",
                border: "none",
                borderRadius: "8px",
                transition: "background-color 0.3s ease",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#0056b3")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#007BFF")
              }
            >
              Login
            </Button>
            <div className="mt-3 text-center">
              <Link
                to="/forget-password"
                style={{ color: "#007BFF", textDecoration: "none" }}
              >
                Forgot Password?
              </Link>
            </div>
            <hr />
            <div className="text-center">
              <p
                style={{
                  display: "inline-block",
                  marginRight: "10px",
                  color: "#666",
                }}
              >
                Don't have an account?
              </p>
              <button
                onClick={() => navigate("/register")}
                type="button"
                className="btn btn-outline-primary"
                style={{
                  color: "white",
                  fontSize: "16px",
                  backgroundColor: "#007BFF",
                  border: "none",
                  borderRadius: "8px",
                  transition: "background-color 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#0056b3")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#007BFF")
                }
              >
                Sign Up
              </button>
            </div>
          </Form>
        </div>
      </div>
    </Box>
  );
}

export default Login;
