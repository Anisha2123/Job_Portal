
const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  applyLink: String,
  shortDescription: String, // Shortened version
  // fullDescription: String,  // Full description
  experience: String,
  postedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Job", jobSchema);


