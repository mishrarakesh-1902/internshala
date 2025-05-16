const Agent = require("../models/Agent");
const DistributedList = require("../models/List");

const distributeListToAgent = async (req, res) => {
  try {
    const { agentName, list } = req.body;

    const agent = await Agent.findOne({ name: agentName });

    if (!agent) {
      return res.status(404).json({ msg: "Agent not found" });
    }

    for (let entry of list) {
      await DistributedList.create({
        agent: agent._id,
        firstName: entry.firstName,
        phone: entry.phone,
        notes: entry.notes,
      });
    }

    res.status(200).json({ msg: "List distributed successfully" });
  } catch (error) {
    console.error("Error distributing list:", error);
    res.status(500).json({ msg: "Something went wrong" });
  }
};

module.exports = { distributeListToAgent };
