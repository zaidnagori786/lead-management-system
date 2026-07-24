const express = require("express");

const router = express.Router();

const {
  createPublicLead,
  getAllLeads,
  getLeadById,
  updateLead,
  deleteLead,
  updateLeadStatus,
  assignLead,
  addNote,
} = require("../controllers/leadController");

const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

// Public Route
router.post("/public", createPublicLead);

// Protected Routes
router.get("/", protect, getAllLeads);

router.get("/:id", protect, getLeadById);

router.put("/:id", protect, updateLead);

router.patch("/:id/status", protect, updateLeadStatus);

router.post("/:id/notes", protect, addNote);

// Admin Routes
router.patch("/:id/assign", protect, authorize("admin"), assignLead);

router.delete("/:id", protect, authorize("admin"), deleteLead);

module.exports = router;