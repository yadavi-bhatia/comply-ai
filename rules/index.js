const { findRule } = require("./ruleMatcher");
const { getSeverity } = require("./riskMapper");

function evaluate(input) {
  const { industry, region, violation } = input;

  // Step 1: Find rule
  const rule = findRule(industry, region, violation);

  // Step 2: If no rule → default LOW
  if (!rule) {
    return {
      risk: "LOW",
      severity: getSeverity("LOW"),
      message: "No compliance violation detected",
      confidence: 0.6
    };
  }

  // Step 3: Map risk → severity
  const severity = getSeverity(rule.risk);

  return {
    industry,
    region,
    violation,
    risk: rule.risk,
    severity,
    explanation: `Violation of ${rule.rule}`,
    confidence: 0.9
  };
}

module.exports = { evaluate };