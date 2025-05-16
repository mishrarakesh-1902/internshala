// import React, { useState } from "react";
// import axiosInstance from "../utils/axiosInstance";

// const AddAgent = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     password: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const { name, email, mobile, password } = formData;

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setError("");
//     setSuccess("");
//   };

//   const validateForm = () => {
//     if (!name || !email || !mobile || !password) {
//       setError("All fields are required");
//       return false;
//     }
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       setError("Invalid email format");
//       return false;
//     }
//     if (!mobile.startsWith("+") || mobile.length < 8) {
//       setError("Mobile number must start with country code (e.g. +91)");
//       return false;
//     }
//     if (password.length < 6) {
//       setError("Password should be at least 6 characters");
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token"); // ✅ Get auth token
//       if (!token) {
//         setError("Login required to add agent");
//         setLoading(false);
//         return;
//       }

//       const res = await axiosInstance.post("/agents/add", formData, {
//         headers: {
//           Authorization: `Bearer ${token}`, // ✅ Send token to backend
//         },
//       });

//       setSuccess("Agent added successfully");
//       setFormData({ name: "", email: "", mobile: "", password: "" });
//     } catch (err) {
//       setError(
//         err.response?.data?.msg || "Something went wrong while adding agent"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
//       <h2>Add New Agent</h2>
//       {error && <div style={{ color: "red", marginBottom: 10 }}>{error}</div>}
//       {success && (
//         <div style={{ color: "green", marginBottom: 10 }}>{success}</div>
//       )}
//       <form onSubmit={handleSubmit}>
//         <div style={{ marginBottom: 10 }}>
//           <label>Name:</label>
//           <input
//             type="text"
//             name="name"
//             value={name}
//             onChange={handleChange}
//             style={{ width: "100%", padding: 8 }}
//             required
//           />
//         </div>
//         <div style={{ marginBottom: 10 }}>
//           <label>Email:</label>
//           <input
//             type="email"
//             name="email"
//             value={email}
//             onChange={handleChange}
//             style={{ width: "100%", padding: 8 }}
//             required
//           />
//         </div>
//         <div style={{ marginBottom: 10 }}>
//           <label>Mobile (with country code):</label>
//           <input
//             type="text"
//             name="mobile"
//             placeholder="+91xxxxxxxxxx"
//             value={mobile}
//             onChange={handleChange}
//             style={{ width: "100%", padding: 8 }}
//             required
//           />
//         </div>
//         <div style={{ marginBottom: 10 }}>
//           <label>Password:</label>
//           <input
//             type="password"
//             name="password"
//             value={password}
//             onChange={handleChange}
//             style={{ width: "100%", padding: 8 }}
//             required
//             minLength={6}
//           />
//         </div>
//         <button
//           type="submit"
//           disabled={loading}
//           style={{
//             padding: "10px 15px",
//             backgroundColor: "#007bff",
//             color: "white",
//             border: "none",
//             cursor: "pointer",
//             width: "100%",
//           }}
//         >
//           {loading ? "Adding..." : "Add Agent"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddAgent;

import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const AddAgent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { name, email, phone, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const validateForm = () => {
    if (!name || !email || !phone || !password) {
      setError("All fields are required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      return false;
    }
    if (!phone.startsWith("+") || phone.length < 8) {
      setError("Phone number must start with country code (e.g. +91)");
      return false;
    }
    if (password.length < 6) {
      setError("Password should be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      await axiosInstance.post("/agents/add", formData);
      setSuccess("Agent added successfully");
      setFormData({ name: "", email: "", phone: "", password: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h2>Add New Agent</h2>
      {error && <div style={{ color: "red", marginBottom: 10 }}>{error}</div>}
      {success && <div style={{ color: "green", marginBottom: 10 }}>{success}</div>}
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />

        <label>Phone (with country code):</label>
        <input
          type="text"
          name="phone"
          placeholder="+91xxxxxxxxxx"
          value={phone}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          required
          minLength={6}
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px 15px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
            width: "100%",
          }}
        >
          {loading ? "Adding..." : "Add Agent"}
        </button>
      </form>
    </div>
  );
};

export default AddAgent;
