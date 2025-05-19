import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
//import Home from "./components/Home";
import Dashboard from "./components/SQLDashboard";
import MongoDashboard from "./components/MongoDashboard";
import Register from "./components/Register";
import Profile from "./components/Profile";
import ItemInfo from "./components/ItemInfo";

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
        <Route path="/items/:id" element={<ItemInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
