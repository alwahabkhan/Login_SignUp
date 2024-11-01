import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SideBar from "../SideBar/Index";
import CountUp from "react-countup";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

function MainAdminDashboard() {
  const navigate = useNavigate();
  const [userCount, setUserCount] = useState(0);
  const [postCount, setPostCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/getcountusers`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setUserCount(res.data.count))
      .catch((err) => console.error("Error fetching user count:", err));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/getcountadmins`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setAdminCount(res.data.count))
      .catch((err) => console.error("Error fetching admin count:", err));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/getcountposts`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setPostCount(res.data.count))
      .catch((err) => console.error("Error fetching post count:", err));
  }, []);

  const pieData = {
    labels: ["Users", "Posts", "Admins"],
    datasets: [
      {
        label: "Total Count",
        data: [userCount, postCount, adminCount],
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Distribution of Users, Posts, and Admins",
      },
    },
  };

  const barData = {
    labels: ["Users", "Posts", "Admins"],
    datasets: [
      {
        label: "Count",
        data: [userCount, postCount, adminCount],
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Count of Users, Posts, and Admins" },
    },
    scales: {
      x: { beginAtZero: true },
      y: { beginAtZero: true },
    },
  };

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexGrow: 1,
        p: 3,
        background: "linear-gradient(to right, #088F8F, #900C3F)",
        minHeight: "100vh",
      }}
    >
      <SideBar />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, mt: 8, marginTop: "20px" }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} md={8} sx={{ marginLeft: "150px" }}>
            <Stack direction="row" spacing={4} justifyContent="space-around">
              <Card
                sx={{
                  minWidth: 280,
                  bgcolor: "#f1f8e9",
                  borderRadius: 3,
                  boxShadow: 3,
                }}
              >
                <CardContent>
                  <Typography
                    sx={{
                      color: "text.secondary",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    Total Number of Users
                  </Typography>
                  <Typography
                    variant="h4"
                    color="primary"
                    sx={{ fontWeight: "medium", mt: 1 }}
                  >
                    <CountUp delay={0.5} end={userCount} duration={0.6} />
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={() => navigate("/users-details")}
                    size="small"
                    color="primary"
                  >
                    View Users
                  </Button>
                </CardActions>
              </Card>
              <Card
                sx={{
                  minWidth: 280,
                  bgcolor: "#e1f5fe",
                  borderRadius: 3,
                  boxShadow: 3,
                }}
              >
                <CardContent>
                  <Typography
                    sx={{
                      color: "text.secondary",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    Total Number of Posts
                  </Typography>
                  <Typography
                    variant="h4"
                    color="primary"
                    sx={{ fontWeight: "medium", mt: 1 }}
                  >
                    <CountUp delay={0.5} end={postCount} duration={0.6} />
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={() => navigate("/posts-details")}
                    size="small"
                    color="primary"
                  >
                    View Posts
                  </Button>
                </CardActions>
              </Card>
              <Card
                sx={{
                  minWidth: 280,
                  bgcolor: "#ffebee",
                  borderRadius: 3,
                  boxShadow: 3,
                }}
              >
                <CardContent>
                  <Typography
                    sx={{
                      color: "text.secondary",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    Total Number of Admins
                  </Typography>
                  <Typography
                    variant="h4"
                    color="primary"
                    sx={{ fontWeight: "medium", mt: 1 }}
                  >
                    <CountUp delay={0.5} end={adminCount} duration={0.6} />
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={() => navigate("/admin-details")}
                    size="small"
                    color="primary"
                  >
                    View Admins
                  </Button>
                </CardActions>
              </Card>
            </Stack>
          </Grid>

          <Grid item xs={12} md={8} sx={{ mt: 4, marginLeft: "200px" }}>
            <Stack direction="row" spacing={4}>
              <Card sx={{ p: 3, maxheight: "600px", maxWidth: "400px" }}>
                {" "}
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Total Users, Posts, and Admins Distribution (Pie Chart)
                </Typography>
                <div>
                  <Pie data={pieData} options={pieOptions} />
                </div>
              </Card>
              <Card sx={{ p: 3, maxheight: "600px", maxWidth: "400px" }}>
                {" "}
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Total Users, Posts, and Admins Distribution (Bar Chart)
                </Typography>
                <div>
                  <Bar data={barData} options={barOptions} />
                </div>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default MainAdminDashboard;
