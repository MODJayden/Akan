const express = require("express");
const {
  createHistoryByAdmin,
  getHistory,
  createHistoryByUser,
  updateStatus,
  deleteHistoryEntry,
} = require("../controller/History");
const router = express.Router();

router.post("/createHistoryByAdmin", createHistoryByAdmin);
router.get("/get/History", getHistory);
router.post("/createHistoryByUser", createHistoryByUser);
router.post("/updateStatus/:id", updateStatus);
router.delete("/deleteHistoryEntry/:id", deleteHistoryEntry);

module.exports = router;
