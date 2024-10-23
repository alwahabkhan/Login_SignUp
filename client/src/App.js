import "bootstrap/dist/css/bootstrap.min.css";
import SignUp from "../src/SignUp.jsx";
import Login from "../src/Login.jsx";
import Home from "../src/Home.jsx";
import ForgetPassword from "./ForgetPassword.jsx";
import ResetPassword from "./ResetPassword.jsx";
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
