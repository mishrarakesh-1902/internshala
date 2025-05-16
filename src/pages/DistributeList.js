import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const DistributedList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDistributedLists = async () => {
      try {
        const res = await axiosInstance.get("/upload/distributed");
        setData(res.data);
      } catch (err) {
        setError("Failed to fetch distributed lists.");
      } finally {
        setLoading(false);
      }
    };

    fetchDistributedLists();
  }, []);

  // Group items by agent
  const groupedByAgent = data.reduce((acc, item) => {
    const agentName = item.assignedTo?.name || "Unassigned";
    if (!acc[agentName]) acc[agentName] = [];
    acc[agentName].push(item);
    return acc;
  }, {});

  if (loading) return <p>Loading distributed lists...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: 20 }}>
      <h2>Distributed Lists by Agents</h2>
      {Object.keys(groupedByAgent).length === 0 && <p>No data available.</p>}

      {Object.entries(groupedByAgent).map(([agent, items]) => (
        <div key={agent} style={{ marginBottom: 30 }}>
          <h3>{agent}</h3>
          <table
            border="1"
            cellPadding="10"
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <thead>
              <tr>
                <th>First Name</th>
                <th>Phone</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {items.map(({ _id, firstName, phone, notes }) => (
                <tr key={_id}>
                  <td>{firstName}</td>
                  <td>{phone}</td>
                  <td>{notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default DistributedList;
