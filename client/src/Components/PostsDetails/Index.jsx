import * as React from "react";
import SideBar from "../SideBar/Index";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function PostsDetails() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/getallposts`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setData(res.data);
        localStorage.getItem("_id", res.data._id);
      })
      .catch((err) => console.error("Error fetching user posts:", err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/deletepost/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setData((prevData) => prevData.filter((user) => user._id !== id));
        // setData(res.data);
        alert("posts deleted successfully");
      })
      .catch((err) => {
        console.error("Error deleting user and posts:", err);
        alert("Failed to delete the user and posts");
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <SideBar />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, bgcolor: "#f4f6f8", minHeight: "100vh" }}
      >
        <TableContainer
          component={Paper}
          sx={{
            width: "75%",
            marginTop: "40px",
            marginBottom: "50px",
            marginLeft: "200px",
            padding: "40px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            borderRadius: "12px",
            backgroundColor: "#fff",
          }}
        >
          <Box>
            <Typography
              variant="h4"
              align="left"
              gutterBottom
              sx={{ fontWeight: "bold" }}
            >
              Details of All Posts:
            </Typography>
          </Box>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Title
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Description
                </TableCell>

                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Created Date
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Image
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{row.title}</TableCell>
                  <TableCell align="center">{row.description}</TableCell>

                  <TableCell align="center">
                    {new Date(row.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="center">
                    <img
                      src={`http://localhost:8000/uploads/images/${row.file}`}
                      alt={row.title}
                      style={{ width: "50px", height: "50px" }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      // onClick={() => navigate(`/view-post/${row._id}`)}
                      variant="contained"
                      type="submit"
                      color="success"
                    >
                      Update
                    </Button>{" "}
                    <Button
                      onClick={() => handleDelete(row._id)}
                      variant="contained"
                      type="submit"
                      color="error"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default PostsDetails;
