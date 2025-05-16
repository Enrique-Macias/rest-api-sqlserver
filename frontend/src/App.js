import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
//import Home from "./components/Home";
import Dashboard from "./components/SQLDashboard";
import MongoDashboard from "./components/MongoDashboard";
import Register from "./components/Register";
import Profile from "./components/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sql-dashboard" element={<Dashboard />} />
        <Route path="/mongo-dashboard" element={<MongoDashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
