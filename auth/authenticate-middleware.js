const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const secret = process.env.JWT_SECRET || "f2hjf92j223d3n";

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.status(401).json({ you: "shall not pass!" });
      } else {
        req.decodedJwt = decoded;
        next();
      }
    });
  } else {
    res.status(401).json({ you: "shall not pass!" });
  }
};
