import React, { useState } from "react";
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
  const [date, setDate] = useState("");
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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

    if (!author) {
      tempErrors["author"] = "Author is required";
      isValid = false;
    }

    if (!date) {
      tempErrors["date"] = "Date is required";
      isValid = false;
    }

    if (!file) {
      tempErrors["image"] = "Image URL is required";
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

    const formattedDate = new Date(date).toISOString();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("author", author);
    formData.append("date", formattedDate);
    formData.append("file", file);

    console.log(file);
    try {
      await axios.post("http://localhost:8000/posts", formData).then((res) => {
        console.log(res);
        navigate("/home");
      });
    } catch (err) {
      console.error("Error during registration:", err);
    }
  };

  return (
    <Container
      sx={{
        maxWidth: "500px",
        width: "30%",
        marginTop: "50px",
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
        action="/post"
        enctype="multipart/form-data"
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
        <TextField
          fullWidth
          label="Enter Author"
          variant="outlined"
          margin="normal"
          onChange={(e) => setAuthor(e.target.value)}
          error={!!errors.author}
          helperText={errors.author}
        />
        <TextField
          fullWidth
          type="date"
          variant="outlined"
          margin="normal"
          onChange={(e) => setDate(e.target.value)}
          error={!!errors.date}
          helperText={errors.date}
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
        <Link to="/home" style={{ textDecoration: "none", color: "#007BFF" }}>
          Go to Home Page
        </Link>
      </Box>
    </Container>
  );
}

export default CreatePost;
