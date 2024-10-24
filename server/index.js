const express = require("express");
const ConnectMongo = require("./connection");
const userRouter = require("./routes/users/index");
const postRouter = require("./routes/posts/index");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static("uploads"));

ConnectMongo();

app.use("/", userRouter);
app.use("/", postRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port no ${PORT}`);
});
