import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ViewPost() {
  const [data, setData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/viewposts/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.error("Error fetching user posts:", err));
  }, [id]);

  if (!data) return <Typography>Loading...</Typography>;

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
      <Card
        sx={{
          maxWidth: "500px",
          marginTop: "100px",
          marginBottom: "50px",
          marginLeft: "500px",
          padding: "40px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: "12px",
          backgroundColor: "#fff",
        }}
      >
        <CardContent>
          <Typography variant="h4" component="div">
            <strong> Title: </strong> {data.title}
          </Typography>
          <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
            <strong> Author: </strong> {data.author}
          </Typography>
          <Typography variant="h6">
            <strong> Description: </strong> {data.description}
            <br />
            <small>
              {" "}
              <strong> Date: </strong>{" "}
              {new Date(data.date).toLocaleDateString()}
            </small>
          </Typography>
          <strong> Image : </strong> <br />
          {data.file && (
            <Box
              component="img"
              sx={{ width: "50%", maxHeight: "500px", mt: 2 }}
              src={`http://localhost:8000/uploads/images/${data.file}`}
              alt="Post related"
            />
          )}
        </CardContent>
        <CardActions>
          <Button onClick={() => navigate("/user-dashboard")} size="small">
            Back to Home Page
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default ViewPost;
