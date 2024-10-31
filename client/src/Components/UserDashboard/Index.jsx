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
import axios from "axios";

function UserDashboard() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

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

  return (
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
      <Typography align="right">
        <Button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("firstname");
            localStorage.removeItem("_id");
            navigate("/login");
          }}
          variant="contained"
          type="submit"
          color="error"
        >
          Logout
        </Button>
      </Typography>
      <Box>
        <Typography variant="h3" align="center" sx={{ fontWeight: "bold" }}>
          User Dashboard
        </Typography>
        <Typography
          variant="h4"
          align="left"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          Welcome {localStorage.getItem("firstname")}
        </Typography>
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
                  onClick={() => navigate(`/view-post/${row._id}`)}
                  variant="contained"
                  type="submit"
                  color="success"
                >
                  View
                </Button>{" "}
                <Button
                  // onClick={() => handleDelete(row._id)}
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
  );
}

export default UserDashboard;
