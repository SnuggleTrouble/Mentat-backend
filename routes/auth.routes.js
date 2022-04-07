const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

const router = express.Router();

// this is a test 

// The User SignUp Route
router.post("/signup", async (req, res) => {
  // Grab the necessary information from the body.
  const { firstName, lastName, email, password } = req.body;
  try {
    // Apply the bcrypt hash onto the password the user used to safely store it in the database
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// The User Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find a user with a given email
    const user = await User.findOne({ email });
    // If that user exists
    if (user) {
      // Check if the password is corerct
      const passwordCorrect = await bcrypt.compare(password, user.password);
      // If the password is correct
      if (passwordCorrect) {
        // A payload is created
        const payload = {
          user,
        };
        // A token is created with an encryption algorithm and expiry time as a safeguard.
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });
        // Send the token along with the user to the front end
        res.status(200).json({
          user,
          token,
        });
      } else {
        res.status(401).json({ message: "Email or password are incorrect" });
      }
    } else {
      res.status(401).json({ message: "Email or password are incorrect" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
