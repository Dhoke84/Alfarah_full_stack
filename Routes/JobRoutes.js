const express = require("express");
const router = express.Router();
const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob
} = require("../Controllers/JobController");

// Route to get all jobs
router.get("/", getAllJobs);

// Route to get a specific job by id
router.get("/:id", getJobById);

// Route to create a new job
router.post("/create", createJob);

// Route to update a job by id
router.put("/:id", updateJob);

// Route to delete a job by id
router.delete("/:id", deleteJob);

module.exports = router;
