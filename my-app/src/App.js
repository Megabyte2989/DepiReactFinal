import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Carspage from './admin_components/CarsBigPage.js';
import Dashboard from './admin_components/Dashboard.js';
import Errorcomp from './admin_components/Errorcomp.js';
import Layout from './admin_components/Layout.js';
import Maintain from './admin_components/Maintain.js';
import RentParent from './admin_components/RentParent.js';
import './App.css';
import CarQuizApp from './containers/client_components/CarQuizApp.js';
import Gallery from './containers/Gallery/Gallery.js';
import Home from './containers/Home/Home.js';
import Login from "./login&register/Login.js";
import ProtectedRoute from "./login&register/ProtectedRoute.js";
import Register from "./login&register/Register.js";
import store from './redux/store.js';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Errorcomp />} />

          {/* Protected Routes for Admin */}
          <Route element={<ProtectedRoute requiredRole="admin" />}>
            <Route path="/dashboard" element={<Layout />}>
              <Route index element={<Dashboard />} /> {/* Dashboard component rendered at /dashboard */}
              <Route path="cars" element={<Carspage />} /> {/* Relative path */}
              <Route path="maintenance" element={<Maintain />} /> {/* Relative path */}
              <Route path="rents" element={<RentParent />} /> {/* Relative path */}
            </Route>
          </Route>

          {/* Protected Routes for User */}
          <Route element={<ProtectedRoute requiredRole="user" />}>
            <Route path="/home" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/quiz" element={<CarQuizApp />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
