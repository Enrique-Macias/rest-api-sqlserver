import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SQLDashboard from "./components/SQLDashboard.js";
import MongoDashboard from "./components/MongoDashboard.js";
import Login from "./components/Login.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/sql-dashboard" element={<SQLDashboard />} />
        <Route path="/mongo-dashboard" element={<MongoDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
