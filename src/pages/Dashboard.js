import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <ul>
        <li><Link to="/add-agent">Add Agent</Link></li>
        <li><Link to="/upload-csv">Upload CSV</Link></li>
        <li><Link to="/distributed-list">Distributed List</Link></li>
      </ul>
    </div>
  );
};

export default Dashboard;