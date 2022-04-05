const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

function authenticate(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) return res.sendStatus(403);

    req.jwtPayload = payload;

    next();
  });
}

module.exports = {
  authenticate,
};
