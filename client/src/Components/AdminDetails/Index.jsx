import React, { useState, useEffect } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import SideBar from "../SideBar/Index";

function AdminDetails() {
  const [data, setData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/getadmin/${localStorage.getItem("_id")}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setData(res.data))
      .catch((err) => console.error("Error fetching admin data:", err));
  }, [id]);

  if (!data) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ display: "flex", bgcolor: "#f4f6f8", minHeight: "100vh" }}>
      <SideBar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          display: "flex",
          justifyContent: "center",
          marginTop: "100px",
        }}
      >
        <Card
          sx={{
            maxWidth: { xs: "90%", sm: "70%", md: "50%" },
            maxHeight: "350px",
            mt: 10,
            p: 4,
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
            borderRadius: "15px",
            background: "linear-gradient(135deg, #fff5e6, #ffd6e0)",
            textAlign: "left",
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              gutterBottom
              sx={{ fontWeight: "bold", color: "#4A4A8A" }}
            >
              Admin Details
            </Typography>
            <Typography variant="h6" sx={{ color: "#4A4A8A", mt: 2 }}>
              <strong>Name:</strong>{" "}
              <span style={{ fontWeight: "normal", color: "#000000" }}>
                {data.firstname} {data.lastname}
              </span>
            </Typography>
            <Typography variant="h6" sx={{ color: "#4A4A8A", mt: 1 }}>
              <strong>Email:</strong>{" "}
              <span style={{ fontWeight: "normal", color: "#000000" }}>
                {data.email}
              </span>
            </Typography>
            <Typography variant="h6" sx={{ color: "#4A4A8A", mt: 1 }}>
              <strong>Gender:</strong>{" "}
              <span style={{ fontWeight: "normal", color: "#000000" }}>
                {data.gender}
              </span>
            </Typography>
            <Typography variant="h6" sx={{ color: "#4A4A8A", mt: 1 }}>
              <strong>Date of Birth:</strong>{" "}
              <span style={{ fontWeight: "normal", color: "#000000" }}>
                {new Date(data.dateofbirth).toLocaleDateString()}
              </span>
            </Typography>
            <Typography variant="h6" sx={{ color: "#4A4A8A", mt: 1 }}>
              <strong>Role:</strong>{" "}
              <span style={{ fontWeight: "normal", color: "#000000" }}>
                {data.role}
              </span>
            </Typography>
            {data.file && (
              <Box
                component="img"
                sx={{
                  width: "60%",
                  maxWidth: 300,
                  mt: 3,
                  borderRadius: "10px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                  border: "2px solid #FF5A5F",
                }}
                src={`http://localhost:8000/uploads/images/${data.file}`}
                alt="Admin profile"
              />
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default AdminDetails;
