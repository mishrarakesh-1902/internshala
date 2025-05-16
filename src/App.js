import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import UploadCSV from "./pages/UploadCSV";
import DistributeList from "./pages/DistributeList";
import AddAgent from "./pages/AddAgent";
import Register from './pages/Register';
function App() {
  return (
    <Router>
      <div>
        <nav style={{ padding: "10px", background: "#f0f0f0" }}>
          <Link to="/login" style={{ marginRight: "10px" }}>Login</Link>
          <Link to="/upload" style={{ marginRight: "10px" }}>Upload CSV</Link>
          {/* Removed Agent List link */}
          <Link to="/add-agent" style={{ marginRight: "10px" }}>Add Agent</Link>
          <Link to="/distribute" style={{ marginRight: "10px" }}>Distributed Lists</Link>
        </nav>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/upload" element={<UploadCSV />} />
          {/* Removed AgentList route */}
          <Route path="/add-agent" element={<AddAgent />} />
          <Route path="/distribute" element={<DistributeList />} />
          {/* Redirect unknown routes to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
