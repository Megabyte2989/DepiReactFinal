import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./login&register/Login";
import Register from "./login&register/Register";
import Dashboard from "./admin_components/Dashboard";
import Errorcomp from "./admin_components/Errorcomp";
import Layout from "./admin_components/Layout";
import ProtectedRoute from "./login&register/ProtectedRoute";
import TestUserPage from "./login&register/TestUserPage";

// function App() {
//   // const [message, setMessage] = useState('');
//   // useEffect(() => {
//   //   axios.get("http://localhost:5000/")
//   //     .then((Response) => {
//   //       setMessage(Response.data)
//   //     })
//   //     .catch(err => {
//   //       console.log("Error fetching data from backend", err)
//   //     })
//   // })

//   // return (
//   //   <div>
//   //     <h1>Backend Response:</h1>
//   //     <p>{message}</p>
//   //   </div>
//   // );

//}

function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path='/' element={<Layout />}>
    //       <Route index element={<Dashboard />} />
    //       <Route path='/cars' />
    //       <Route path='/maintenance' />
    //     </Route>
    //     <Route path="*" element={<Errorcomp />} />
    //   </Routes>

    // </BrowserRouter>
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="register" element={<Register />} />

          <Route path="*" element={<Errorcomp />} />

          <Route element={<ProtectedRoute requiredRole="admin" />}>
            <Route path="/" element={<Layout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="/cars" />
              <Route path="/maintenance" />
            </Route>
          </Route>

          <Route element={<ProtectedRoute requiredRole="user" />}>
            <Route path="/userPage" element={<TestUserPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
