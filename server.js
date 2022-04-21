const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
dotenv.config();
const { authenticate } = require("./middlewares/jwt.middleware");

// Connect to the database
mongoose.connect(process.env.MONGO_DB_URL, () => {
    console.log("Connected to MongoDB")
});

// Creating a new Express app
const app = express();

// Use Cross-Origin Resource Sharing (CORS) that allows a server to indicate
// any origins (domain, shceme, or port) other than its own from which
// a browser should permit loading resources.
app.use(cors());

// Make the server accept json requests
app.use(express.json());

// The Authentication Route
const authRoute = require("./routes/auth.routes");
app.use("/auth", authRoute);

// The Post Route
const postRoute = require("./routes/post.routes");
app.use("/post", authenticate, postRoute);

// The Comment Route
const commentRoute = require("./routes/comment.routes");
app.use("/comment", authenticate, commentRoute);

// Listen to upcoming requests
app.listen(process.env.PORT, () => {
    console.log("Backend server is running!")
});
