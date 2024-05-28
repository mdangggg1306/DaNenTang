const jwt = require("jsonwebtoken");
const SECRET_KEY = "e5e9fa1ba31ecd1ae84f75caaa474f3a663f05f4";
const EXPIRES_IN = "4d";
const REFRESH_SECRET_KEY = "e5e9fa1ba31ecd1ae84f75caaa474f3a663f01f2";

async function refreshToken(req, res) {
  const refreshToken = req.body.token;

  if (refreshToken == null) return res.sendStatus(401);

  jwt.verify(refreshToken, REFRESH_SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);

    const token = jwt.sign({ _id: user._id }, SECRET_KEY, {
      expiresIn: EXPIRES_IN,
    });

    res.json({ token: token });
  });
}

module.exports = refreshToken;
