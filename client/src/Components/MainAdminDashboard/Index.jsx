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
      .then((res) => {
        setUserCount(res.data.count);
      })
      .catch((err) => console.error("Error fetching user posts:", err));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/getcountadmins`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setAdminCount(res.data.count);
      })
      .catch((err) => console.error("Error fetching user posts:", err));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/getcountposts`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setPostCount(res.data.count);
      })
      .catch((err) => console.error("Error fetching user posts:", err));
  }, []);

  return (
    <Box sx={{ display: "flex", bgcolor: "#f4f6f8", minHeight: "100vh" }}>
      <SideBar />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, mt: 8, marginTop: "200px" }}
      >
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={8}>
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
                    {userCount}
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
                    {postCount}
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
                    {adminCount}
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
        </Grid>
      </Box>
    </Box>
  );
}

export default MainAdminDashboard;
