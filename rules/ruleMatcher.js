const rulesData = require("../data/rules.json");

function findRule(industry, region, violation) {
  return rulesData.rules.find(
    (rule) =>
      rule.industry === industry &&
      rule.region === region &&
      rule.violation === violation
  );
}

module.exports = { findRule };