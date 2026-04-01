const rules = require("../data/rules.json");

exports.checkCompliance = (req, res) => {
  const { industry, region } = req.body;

  const rule = rules.find(
    (r) => r.industry === industry && r.region === region
  );

  if (!rule) {
    return res.json({
      status: "compliant",
      missing: [],
      risk: "LOW"
    });
  }

  res.json({
    status: rule.status,
    missing: rule.missing,
    risk: rule.risk
  });
};

exports.simulateImpact = (req, res) => {
  const { risk } = req.body;

  const simulation = {
    LOW: {
      fine: "No fine",
      impact: "Minor warning"
    },
    MEDIUM: {
      fine: "₹10,00,000",
      impact: "Regulatory warning"
    },
    HIGH: {
      fine: "₹50,00,000",
      impact: "Service restriction"
    }
  };

  const result = simulation[risk];

  if (!result) {
    return res.status(400).json({
      error: "Invalid risk level"
    });
  }

  res.json({
    risk,
    fine: result.fine,
    impact: result.impact
  });
};