const express = require("express");
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");
const List = require("../models/List");
const Agent = require("../models/Agent");
const auth = require("../middleware/auth");

const router = express.Router();

// Multer setup with file filter
const upload = multer({
  dest: "uploads/",
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "text/csv" || file.originalname.endsWith(".csv")) {
      cb(null, true);
    } else {
      cb(new Error("Only CSV files are allowed"), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Route to upload and distribute CSV
router.post("/csv", auth, upload.single("file"), async (req, res) => {
  if (!req.file) {
    console.error("❌ No file uploaded.");
    return res.status(400).send("No file uploaded.");
  }

  const results = [];
  const filePath = path.resolve(req.file.path);

  try {
    const agents = await Agent.find();
    if (agents.length === 0) {
      console.error("❌ No agents found in DB.");
      return res.status(400).send("No agents found in the system.");
    }

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => {
        results.push(data);
      })
      .on("end", async () => {
        try {
          let i = 0;
          for (const row of results) {
            const assignedAgent = agents[i % agents.length];

            // Validate required fields
            if (!row.firstName || !row.phone) {
              console.warn("Skipping row due to missing required fields:", row);
              continue;
            }

            const listEntry = new List({
              firstName: row.firstName,
              phone: row.phone,
              notes: row.notes || "",
              assignedTo: assignedAgent._id,
            });

            await listEntry.save();
            i++;
          }

          fs.unlinkSync(filePath); // Remove the uploaded file after processing
          res.status(200).send("✅ CSV processed and distributed successfully.");
        } catch (processingError) {
          console.error("❌ Error processing CSV data:", processingError.message);
          res.status(500).send("Failed to process CSV data.");
        }
      })
      .on("error", (csvError) => {
        console.error("❌ CSV parsing error:", csvError.message);
        res.status(500).send("Failed to read CSV file.");
      });

  } catch (outerError) {
    console.error("❌ Unexpected error:", outerError.message);
    res.status(500).send("Unexpected server error.");
  }
});

// Route to get distributed data
router.get("/distributed", auth, async (req, res) => {
  try {
    const data = await List.find().populate("assignedTo", "name email");
    res.json(data);
  } catch (err) {
    console.error("❌ Error fetching distributed data:", err.message);
    res.status(500).send("Failed to fetch data.");
  }
});

module.exports = router;
