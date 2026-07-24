import React from "react";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import DashboardLayout from "./components/layout/DashboardLayout";
import BusinessRegistry from "./components/business/BusinessRegistry";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="negocios" element={<BusinessRegistry />} />
            <Route path="catalogo" element={<BusinessRegistry />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
