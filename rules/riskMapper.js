const mappings = require("../data/mappings.json");

function getSeverity(risk) {
  return mappings.risk_to_severity[risk] || mappings.risk_to_severity["LOW"];
}

module.exports = { getSeverity };