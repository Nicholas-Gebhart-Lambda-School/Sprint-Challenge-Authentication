const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const validateUser = require("./auth-helpers");
const Users = require("../users/users-model");

router.post("/register", (req, res) => {
  const user = req.body;
  const result = validateUser(user);

  if (result.isSuccessful) {
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
    Users.add(user)
      .then(user => {
        const { id, username } = user;
        res.status(200).json({ id, username });
      })
      .catch(() => {
        res.status(500).json({ message: "server error" });
      });
  } else {
    res.status(400).json({
      message: "Error validating user",
      error: result.errors
    });
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = getJwt(user.id);
        console.log(token);
        res.status(200).json({
          message: "welcome",
          token
        });
      } else {
        res.status(401).json({ message: "You shall not pass!" });
      }
    })
    .catch(() => {
      res.status(500).json({ message: "server error" });
    });
});

function getJwt(id) {
  const payload = {
    id
  };

  const options = {
    expiresIn: "1d"
  };

  const secret = "keep it secret, keep it safe";
  return jwt.sign(payload, secret, options);
}

module.exports = router;
