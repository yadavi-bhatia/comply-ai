// Weights for different violations
const weights = {
  transparency: 40,
  data_privacy: 35,
  reporting: 25,
  documentation: 20
};

// Step 1: Calculate score based on violations
function calculateScore(violations) {
  let score = 0;

  violations.forEach(v => {
    score += weights[v] || 10; // default small penalty
  });

  return Math.min(score, 100); // cap at 100
}

// Step 2: Convert score into real-world impact
function getImpact(score) {
  if (score >= 80) {
    return {
      risk: "HIGH",
      fine: "₹50,00,000",
      impact: "Service restriction possible",
      reputation: "Severe damage"
    };
  } else if (score >= 50) {
    return {
      risk: "MEDIUM",
      fine: "₹10,00,000",
      impact: "Compliance warning issued",
      reputation: "Moderate impact"
    };
  } else {
    return {
      risk: "LOW",
      fine: "No fine",
      impact: "No major issues",
      reputation: "No impact"
    };
  }
}

// Step 3: Generate explanation text
function generateExplanation(violations, risk) {
  if (!violations || violations.length === 0) {
    return "System is fully compliant with regulations.";
  }

  return `Risk is ${risk} due to missing ${violations.join(", ")} compliance.`;
}

// FINAL FUNCTION (used by backend)
function simulateImpact(violations = []) {
  const score = calculateScore(violations);
  const impactData = getImpact(score);
  const explanation = generateExplanation(violations, impactData.risk);

  return {
    score,
    violations,
    ...impactData,
    explanation
  };
}

module.exports = simulateImpact;