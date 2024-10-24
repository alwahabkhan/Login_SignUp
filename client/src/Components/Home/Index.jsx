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

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/get-post")
      .then((res) => setData(res.data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const navigate = useNavigate();

  return (
    <TableContainer
      component={Paper}
      sx={{
        width: "75%",
        marginTop: "80px",
        marginLeft: "200px",
        padding: "40px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        borderRadius: "12px",
        backgroundColor: "#fff",
      }}
    >
      <Typography align="right">
        <Button
          onClick={() => navigate("/login")}
          variant="contained"
          type="submit"
          color="error"
        >
          Logout
        </Button>
      </Typography>
      <Box>
        <Typography variant="h3" align="center">
          User Dashboard
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
            <TableCell align="center">Title</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Author</TableCell>
            <TableCell align="center">Created Date</TableCell>
            <TableCell align="center">Image Url</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              //   key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {/* <TableCell component="th" scope="row">
                {row.id}
              </TableCell> */}
              <TableCell align="center">{row.title}</TableCell>
              <TableCell align="center">{row.description}</TableCell>
              <TableCell align="center">{row.author}</TableCell>
              <TableCell align="center">{row.date}</TableCell>
              <TableCell align="center">{row.file}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Home;
