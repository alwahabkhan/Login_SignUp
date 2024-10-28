import "bootstrap/dist/css/bootstrap.min.css";
import SignUp from "./Components/Signup/SignUp.jsx";
import Login from "../src/Components/login/Index.jsx";
import Home from "../src/Components/Home/Index.jsx";
import CreatePost from "../src/Components/CreatePost/Index.jsx";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword.jsx";
import ResetPassword from "../src/Components/ResetPassword/Index.jsx";
import ViewPost from "./ShowPost/Index.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<SignUp />}></Route>
        <Route path="/" element={<Login />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/forget-password" element={<ForgetPassword />}></Route>
        <Route
          path="/reset-password/:id/:token"
          element={<ResetPassword />}
        ></Route>
        <Route path="/create-post" element={<CreatePost />}></Route>
        <Route path="/view-table" element={<ViewPost />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
