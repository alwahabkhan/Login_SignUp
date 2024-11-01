import * as React from "react";
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
import PanoramaIcon from "@mui/icons-material/Panorama";
import TablePagination from "@mui/material/TablePagination";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import Swal from "sweetalert2";
import Stack from "@mui/material/Stack";
import LogoutIcon from "@mui/icons-material/Logout";

function UserDashboard() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/getposts/${localStorage.getItem("_id")}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setData(res.data);
        localStorage.getItem("_id", res.data._id);
      })
      .catch((err) => console.error("Error fetching user posts:", err));
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8000/deletepost/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            setData((prevData) => prevData.filter((user) => user._id !== id));
            Swal.fire("Deleted!", "posts deleted successfully", "success");
          })
          .catch((err) => {
            console.error("Error deleting user and posts:", err);
            Swal.fire("Error", "Failed to delete the user and posts", "error");
          });
      }
    });
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
      <Paper
        sx={{
          width: "80%",
          overflow: "hidden",
          marginTop: "50px",
          marginLeft: "150px",
          padding: "20px",
        }}
      >
        <TableContainer sx={{ maxHeight: 540 }}>
          <Box>
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{ fontWeight: "bold", marginLeft: "20px", marginTop: "20px" }}
            >
              {localStorage.getItem("firstname")} Dashboard
            </Typography>
          </Box>
          <Stack direction="row" spacing={118}>
            <Box>
              <Typography align="left">
                <LogoutIcon
                  sx={{
                    fontSize: "28px",
                    color: "red",
                    cursor: "pointer",
                    marginLeft: "20px",
                  }}
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("firstname");
                    localStorage.removeItem("_id");
                    navigate("/login");
                  }}
                />
              </Typography>
            </Box>
            <Box>
              <Typography align="right">
                <Button
                  onClick={() => navigate("/create-post")}
                  variant="contained"
                  type="submit"
                >
                  New Post
                </Button>
              </Typography>
            </Box>
          </Stack>
          <Table stickyHeader aria-label="sticky table">
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
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
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
                      <PanoramaIcon
                        sx={{
                          color: "green",
                          fontSize: "28px",
                          cursor: "pointer",
                        }}
                        onClick={() => navigate(`/view-post/${row._id}`)}
                      />{" "}
                      <DeleteIcon
                        sx={{
                          fontSize: "28px",
                          color: "red",
                          cursor: "pointer",
                        }}
                        onClick={() => handleDelete(row._id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[4, 8, 12]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

export default UserDashboard;
