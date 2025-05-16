// const express = require("express");
// const router = express.Router();
// const Agent = require("../models/Agent");
// const bcrypt = require("bcryptjs");
// const auth = require("../middleware/auth");

// // ✅ Add New Agent
// router.post("/add", auth, async (req, res) => {
//   try {
//     const { name, email, phone, password } = req.body;

//     // ✅ Validate input
//     if (!name || !email || !phone || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // ✅ Check if agent already exists
//     const existingAgent = await Agent.findOne({ email });
//     if (existingAgent) {
//       return res.status(400).json({ message: "Agent already exists with this email" });
//     }

//     // ✅ Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // ✅ Create and save the agent
//     const agent = new Agent({
//       name,
//       email,
//       phone,
//       password: hashedPassword,
//     });

//     await agent.save();
//     res.status(201).json({ message: "Agent created successfully" });

//   } catch (error) {
//     console.error("Error creating agent:", error.message);
//     res.status(500).json({ message: "Server error while creating agent" });
//   }
// });

// // ✅ Get all agents
// router.get("/all", auth, async (req, res) => {
//   try {
//     const agents = await Agent.find().select("-password"); // don't return password
//     res.json(agents);
//   } catch (error) {
//     console.error("Error fetching agents:", error.message);
//     res.status(500).json({ message: "Server error while fetching agents" });
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const Agent = require("../models/Agent");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");

router.post("/add", auth, async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const agent = new Agent({ name, email, phone, password: hashedPassword });
    await agent.save();

    res.status(201).json({ message: "Agent created successfully" });
  } catch (err) {
    console.error("Error creating agent:", err);
    res.status(500).json({ message: "Failed to create agent" });
  }
});

router.get("/all", auth, async (req, res) => {
  const agents = await Agent.find();
  res.json(agents);
});

module.exports = router;
