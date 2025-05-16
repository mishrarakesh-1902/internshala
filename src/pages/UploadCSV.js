import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import axios from 'axios';
const UploadCSV = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a CSV file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axiosInstance.post("/upload/csv", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccess(response.data || "CSV uploaded and processed successfully.");
      setFile(null);
      e.target.reset();
    } catch (err) {
      setError(
        err.response?.data?.msg ||
          "Error occurred while uploading CSV. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto", padding: 20 }}>
      <h2>Upload CSV File</h2>
      {error && <div style={{ color: "red", marginBottom: 10 }}>{error}</div>}
      {success && <div style={{ color: "green", marginBottom: 10 }}>{success}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          required
          style={{ marginBottom: 10 }}
        />
        <br />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px 15px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          {loading ? "Uploading..." : "Upload CSV"}
        </button>
      </form>
    </div>
  );
};
const distributeList = async (agentName, listData) => {
  try {
    const response = await axios.post("/api/lists/distribute", {
      agentName: agentName,
      list: listData
    });

    console.log(response.data); // Show success message to user
    alert("List distributed successfully!");
  } catch (error) {
    console.error("Error distributing list:", error);
    alert("Failed to distribute list.");
  }
};

export default UploadCSV;
