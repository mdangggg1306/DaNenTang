const jwt = require("jsonwebtoken");
const SECRET_KEY = "e5e9fa1ba31ecd1ae84f75caaa474f3a663f05f4";

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  console.log("Exp:", authHeader);
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
