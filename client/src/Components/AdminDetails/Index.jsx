import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import axios from "axios";
import SideBar from "../SideBar/Index";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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

  if (!data)
    return (
      <Stack
        sx={{
          marginTop: "250px",
          marginLeft: "500px",
        }}
        spacing={2}
      >
        <Skeleton variant="rectangular" width={610} height={60} />
        <Skeleton variant="rounded" width={610} height={60} />
        <Skeleton variant="rectangular" width={610} height={60} />
        <Skeleton variant="rounded" width={610} height={60} />
      </Stack>
    );

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
        sx={{
          flexGrow: 1,
          p: 3,
          display: "flex",
          justifyContent: "center",
          marginTop: "150px",
          marginBottom: "270px",
          marginLeft: "200px",
          marginRight: "200px",
        }}
      >
        <TableContainer component={Paper}>
          <Typography
            variant="h4"
            sx={{ marginLeft: "20px", marginTop: "16px" }}
          >
            <strong> Details of Admin: </strong>
          </Typography>
          <Table sx={{ minWidth: 350 }} aria-label="admin details table">
            <TableBody>
              <TableRow>
                <TableCell align="left">
                  <strong>First Name</strong>
                </TableCell>
                <TableCell align="left">{data.firstname}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">
                  <strong>Last Name</strong>
                </TableCell>
                <TableCell align="left">{data.lastname}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">
                  <strong>Email</strong>
                </TableCell>
                <TableCell align="left">{data.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">
                  <strong>Gender</strong>
                </TableCell>
                <TableCell align="left">{data.gender}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">
                  <strong>Date of Birth</strong>
                </TableCell>
                <TableCell align="left">
                  {new Date(data.dateofbirth).toLocaleDateString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">
                  <strong>Role</strong>
                </TableCell>
                <TableCell align="left">{data.role}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default AdminDetails;
