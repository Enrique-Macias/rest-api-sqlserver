import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
//import Home from "./components/Home";
import Dashboard from "./components/SQLDashboard";
import MongoDashboard from "./components/MongoDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sql-dashboard" element={<Dashboard />} />
        <Route path="/mongo-dashboard" element={<MongoDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
