const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  roleName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  qualifications: {
    type: [String], // Array of strings
    required: true,
  },
  keyResponsibilities: {
    type: [String], // Array of strings
    required: true,
  },
}, { timestamps: true });

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
