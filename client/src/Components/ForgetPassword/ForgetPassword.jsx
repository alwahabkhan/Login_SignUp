import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ForgetPassword() {
  const [email, setEmail] = useState();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:8000/forget-password", {
          email,
        })
        .then((result) => {
          navigate("/login");
          console.log(result);
          return result;
        });
    } catch (err) {
      console.error("Error during registration:", err);
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
            Forgot Password{" "}
          </h3>
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
            Send Email
          </Button>
          <br />
          <br />
          <Button
            onClick={() => navigate("/login")}
            variant="primary"
            type="button"
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
            Go Back
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default ForgetPassword;
