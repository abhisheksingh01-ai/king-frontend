import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./home/Home";
import Login from "./auth/Login/Login";
import Dashboard from "./auth/dashboard/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Single-page routes (scroll based) */}
        <Route path="/" element={<Home />} />
        <Route path="/satta-king" element={<Home />} />
        <Route path="/chart" element={<Home />} />

        {/* Hidden admin routes */}
        <Route path="/hidden-login" element={<Login />} />
        <Route path="/hidden-dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
