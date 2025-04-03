require("dotenv").config();
const express = require("express");
const cors = require("cors");
const carRoutes = require("./src/routes/carRoutes");
const db = require("./src/models");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/cars", carRoutes);

db.sequelize.sync()
  .then(() => console.log('Database synchronized successfully.'))
  .catch(err => console.error('Error synchronizing database:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
