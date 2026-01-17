import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";

import Home from "./home/Home";
import Login from "./auth/Login/Login";
import Dashboard from "./auth/dashboard/Dashboard";
import WelcomePopup from "./components/welcome/WelcomePopup";
import NotFound from './home/NotFound';

/* --- 1. CONFIG: LAYOUT FOR PUBLIC PAGES --- */
// This layout contains the WelcomePopup. 
// Any route wrapped in this will show the popup.
const PublicLayout = () => {
  return (
    <>
      <WelcomePopup />
      <Outlet /> {/* This represents the page content (Home, etc) */}
    </>
  );
};

/* --- 2. CONFIG: PROTECTED ROUTE LOGIC --- */
// This checks if the user is logged in.
// If NOT logged in -> Redirects to Login Page.
// If Logged in -> Shows the Dashboard.
const ProtectedRoute = () => {
  // You must set this key 'isAdminLoggedIn' inside your Login.jsx when login is successful
  const isAuthenticated = localStorage.getItem("isAdminLoggedIn");
  
  return isAuthenticated ? <Outlet /> : <Navigate to="/hidden-login" replace />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* GROUP 1: Public Routes (With Popup) */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/satta-king" element={<Home />} />
          <Route path="/chart" element={<Home />} />
        </Route>

        {/* GROUP 2: Login Page (No Popup, Public) */}
        <Route path="/hidden-login" element={<Login />} />

        {/* GROUP 3: Protected Admin Routes (No Popup, Requires Login) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/hidden-dashboard" element={<Dashboard />} />
        </Route>

        {/* GROUP 4: 404 Page (No Popup) */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}