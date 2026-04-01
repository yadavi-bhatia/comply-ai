const express = require("express");
const router = express.Router();

const {
  checkCompliance,
  simulateImpact
} = require("../controllers/complianceController");

router.post("/check", checkCompliance);
router.post("/simulate", simulateImpact);

module.exports = router;