import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Container, Box, Typography, Input } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("_id");
    setAuthor(userId);
  }, []);

  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    if (!title) {
      tempErrors["title"] = "Title is required";
      isValid = false;
    }

    if (!description) {
      tempErrors["description"] = "Description is required";
      isValid = false;
    }

    if (!file) {
      tempErrors["image"] = "Image is required";
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

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("author", author);
    formData.append("file", file);

    try {
      await axios.post("http://localhost:8000/createposts", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/user-dashboard");
    } catch (err) {
      console.error("Error during post creation:", err);
    }
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        background: "linear-gradient(to right,  #4682B4, #40E0D0)",
        minHeight: "100vh",
      }}
    >
      <Container
        sx={{
          maxWidth: "500px",
          width: "30%",
          marginTop: "100px",
          padding: "40px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: "12px",
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Create New Entry
        </Typography>

        <form
          onSubmit={handleSubmit}
          method="POST"
          encType="multipart/form-data"
        >
          <TextField
            fullWidth
            label="Enter Title"
            variant="outlined"
            margin="normal"
            onChange={(e) => setTitle(e.target.value)}
            error={!!errors.title}
            helperText={errors.title}
          />
          <TextField
            fullWidth
            label="Enter Description"
            variant="outlined"
            margin="normal"
            onChange={(e) => setDescription(e.target.value)}
            error={!!errors.description}
            helperText={errors.description}
          />
          <Input
            fullWidth
            accept="image/*"
            type="file"
            name="file"
            variant="outlined"
            margin="normal"
            onChange={(e) => setFile(e.target.files[0])}
            error={!!errors.image}
            helperText={errors.image}
          />
          <br /> <br />
          <Button variant="contained" type="submit" fullWidth>
            Submit
          </Button>
        </form>
        <Box mt={2} textAlign="center">
          <Link
            to="/user-dashboard"
            style={{ textDecoration: "none", color: "#007BFF" }}
          >
            Go to Home Page
          </Link>
        </Box>
      </Container>
    </Box>
  );
}

export default CreatePost;
