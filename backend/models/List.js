const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  firstName: String,
  phone: {
    type: String,
    required: true,
  },
  notes: String,
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agent",
  },
});

module.exports = mongoose.model("List", listSchema);
