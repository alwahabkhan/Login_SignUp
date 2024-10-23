import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { id, token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:8000/reset-password/${id}/${token}`,
        {
          password,
        }
      );
      navigate("/login");
      console.log(response);
    } catch (err) {
      console.error("Error during reset password:", err);
    }
  };

  return (
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
          <h3
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              color: "#333",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            Reset Password
          </h3>
          <Form.Group className="mb-3">
            <Form.Label style={{ fontSize: "14px", color: "#555" }}>
              New Password
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "8px",
                borderColor: "#ccc",
                boxShadow: "none",
              }}
            />
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
            Update Password
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default ResetPassword;
