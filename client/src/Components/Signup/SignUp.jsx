import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Typography } from "@mui/material";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

function SignUp() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [dateofbirth, setDateOfBirth] = useState("");
  const [error, setError] = useState("");
  const [role, setRole] = useState("");
  const [secretkey, setSecretKey] = useState("");

  let navigate = useNavigate();

  const validateForm = () => {
    if (
      !firstname ||
      !lastname ||
      !email ||
      !password ||
      !confirmpassword ||
      !gender ||
      !dateofbirth
    ) {
      setError("All fields are required.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email format.");
      return false;
    }
    if (password !== confirmpassword) {
      setError("Passwords do not match.");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    if (role === "Admin" && secretkey !== "Alwahabkhan") {
      alert("Invalid Admin");
      e.preventDefault();
    } else {
      e.preventDefault();
      setError("");

      if (validateForm()) {
        try {
          await axios
            .post("http://localhost:8000/register", {
              firstname,
              lastname,
              email,
              password,
              gender,
              dateofbirth,
              role,
            })
            .then((res) => {
              console.log(res);
              navigate("/login");
            });
        } catch (err) {
          console.error("Error during registration:", err);
        }
      }
    }
  };

  return (
    <div
      className="container"
      style={{
        maxWidth: "500px",
        marginTop: "50px",
        marginBottom: "50px",
        padding: "30px",
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
            Create Your Account
          </h1>

          {error && (
            <p style={{ color: "red", textAlign: "center" }}>{error}</p>
          )}

          <Form.Group className="mb-4">
            <FormControl component="fieldset" sx={{ maxWidth: "50%" }}>
              <FormLabel component="legend">Register As:</FormLabel>
              <RadioGroup
                row
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <FormControlLabel
                  value="User"
                  control={<Radio />}
                  label="User"
                />
                <FormControlLabel
                  value="Admin"
                  control={<Radio />}
                  label="Admin"
                />
              </RadioGroup>
            </FormControl>

            <br />
            {role === "Admin" && (
              <>
                <Typography style={{ fontSize: "14px", color: "#555" }}>
                  Secret Key
                </Typography>
                <Form.Control
                  type="text"
                  placeholder="Enter Secret Key"
                  onChange={(e) => setSecretKey(e.target.value)}
                  fullWidth
                  margin="normal"
                  style={{
                    borderRadius: "8px",
                    borderColor: "#ccc",
                    boxShadow: "none",
                  }}
                />
              </>
            )}
            <br />
            <Form.Label style={{ fontSize: "14px", color: "#555" }}>
              First Name
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter First Name"
              onChange={(e) => setFirstName(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "8px",
                borderColor: "#ccc",
                boxShadow: "none",
              }}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label style={{ fontSize: "14px", color: "#555" }}>
              Last Name
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Last Name"
              onChange={(e) => setLastName(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "8px",
                borderColor: "#ccc",
                boxShadow: "none",
              }}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label style={{ fontSize: "14px", color: "#555" }}>
              Email address
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "8px",
                borderColor: "#ccc",
                boxShadow: "none",
              }}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label style={{ fontSize: "14px", color: "#555" }}>
              Password
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "8px",
                borderColor: "#ccc",
                boxShadow: "none",
              }}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label style={{ fontSize: "14px", color: "#555" }}>
              Confirm Password
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "8px",
                borderColor: "#ccc",
                boxShadow: "none",
              }}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label style={{ fontSize: "14px", color: "#555" }}>
              Gender
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Gender"
              onChange={(e) => setGender(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "8px",
                borderColor: "#ccc",
                boxShadow: "none",
              }}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label style={{ fontSize: "14px", color: "#555" }}>
              Date of Birth
            </Form.Label>
            <Form.Control
              type="date"
              onChange={(e) => setDateOfBirth(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "8px",
                borderColor: "#ccc",
                boxShadow: "none",
              }}
            />
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
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
            Sign Up
          </Button>

          <div className="text-center mt-4">
            <p
              style={{
                display: "inline-block",
                marginRight: "10px",
                color: "#666",
              }}
            >
              Already have an account?
            </p>
            <button
              onClick={() => navigate("/login")}
              type="button"
              className="btn btn-outline-primary"
              style={{
                color: "white",
                backgroundColor: "#007BFF",
                borderRadius: "8px",
                padding: "10px 20px",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#0056b3")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#007BFF")
              }
            >
              Login
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default SignUp;
