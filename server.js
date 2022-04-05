const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
dotenv.config();

mongoose.connect(process.env.MONGO_DB_URL);

const app = express();

app.use(cors());

app.use(express.json());

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

app.listen(process.env.PORT);
