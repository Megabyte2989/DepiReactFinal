import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Carspage from './admin_components/CarsBigPage';
import Dashboard from './admin_components/Dashboard';
import Errorcomp from './admin_components/Errorcomp';
import Layout from './admin_components/Layout';
import Maintain from './admin_components/Maintain';
import RentParent from './admin_components/RentParent';
import './App.css';
import Login from "./login&register/Login";
import ProtectedRoute from "./login&register/ProtectedRoute";
import Register from "./login&register/Register";
import TestUserPage from "./login&register/TestUserPage";
import store from './redux/store';

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
            <Route path="/userPage" element={<TestUserPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
