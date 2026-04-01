const express = require("express");
const cors = require("cors");

const complianceRoutes = require("./routes/complianceRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", complianceRoutes);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});