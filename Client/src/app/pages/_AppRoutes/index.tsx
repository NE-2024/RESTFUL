import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../auth/Login";
import DashboardLayout from "../dashboard";
import Signup from "../auth/Signup";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/auth/login"  element={<Login />} />
      <Route path="/auth/register" element={<Signup />} />
      <Route path="/dashboard" element={<DashboardLayout />} />
      <Route path="/dashboard/books" element={<DashboardLayout />} />
    </Routes>
  );
}

export default AppRoutes;
