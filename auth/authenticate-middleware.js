const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  console.log("hello", token);

  if (token) {
    const secret = process.env.JWT_SECRET || "keep it secret, keep it safe";

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "invalid credentials" });
      } else {
        req.decodedJwt = decoded;
        next();
      }
    });
  } else {
    res.status(401).json({ you: "shall not pass!" });
  }
};
