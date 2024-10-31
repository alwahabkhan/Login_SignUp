import "bootstrap/dist/css/bootstrap.min.css";
import SignUp from "./Components/Signup/SignUp.jsx";
import Login from "../src/Components/login/Index.jsx";
import UserDashboard from "../src/Components/UserDashboard/Index.jsx";
import CreatePost from "../src/Components/CreatePost/Index.jsx";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword.jsx";
import ResetPassword from "../src/Components/ResetPassword/Index.jsx";
import ViewPost from "../src/Components/ShowPost/Index.js";
import AdminDetails from "./Components/AdminDetails/Index.jsx";
import MainAdminDashboard from "./Components/MainAdminDashboard/Index.jsx";
import UsersDetails from "./Components/UsersDetails/Index.jsx";
import PostsDetails from "./Components/PostsDetails/Index.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<SignUp />}></Route>
        <Route path="/" element={<Login />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/user-dashboard" element={<UserDashboard />}></Route>
        <Route path="/forget-password" element={<ForgetPassword />}></Route>
        <Route
          path="/reset-password/:id/:token"
          element={<ResetPassword />}
        ></Route>
        <Route path="/create-post" element={<CreatePost />}></Route>
        <Route path="/view-post/:id" element={<ViewPost />}></Route>
        <Route path="/admin-details" element={<AdminDetails />}></Route>
        <Route path="/admin-dashboard" element={<MainAdminDashboard />}></Route>
        <Route path="/users-details" element={<UsersDetails />}></Route>
        <Route path="/posts-details" element={<PostsDetails />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
