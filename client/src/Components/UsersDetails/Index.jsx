import * as React from "react";
import SideBar from "../SideBar/Index";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Paper from "@mui/material/Paper";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function UsersDetails() {
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
      .get(`http://localhost:8000/getallusers`, {
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
          .delete(`http://localhost:8000/deleteuser/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            setData((prevData) => prevData.filter((user) => user._id !== id));
            Swal.fire(
              "Deleted!",
              "User and associated posts deleted successfully",
              "success"
            );
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
          marginLeft: "140px",
          marginTop: "30px",
        }}
      >
        <Paper
          sx={{
            width: "100%",
            overflow: "hidden",
            marginTop: "100px",
            marginLeft: "100px",
            marginBottom: "50px",
          }}
        >
          <Box>
            <Typography
              variant="h4"
              align="left"
              gutterBottom
              sx={{ fontWeight: "bold", marginLeft: "20px", marginTop: "20px" }}
            >
              Details of the Users:
            </Typography>
          </Box>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    First Name
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Last Name
                  </TableCell>

                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Email
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Gender
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Date of Birth
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Role
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
                      <TableCell align="center">{row.firstname}</TableCell>
                      <TableCell align="center">{row.lastname}</TableCell>
                      <TableCell align="center">{row.email}</TableCell>
                      <TableCell align="center">{row.gender}</TableCell>
                      <TableCell align="center">{row.dateofbirth}</TableCell>
                      <TableCell align="center">{row.role}</TableCell>
                      <TableCell align="center">
                        <EditIcon
                          sx={{
                            fontSize: "28px",
                            color: "blue",
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
    </Box>
  );
}

export default UsersDetails;
