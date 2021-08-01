const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(500).json({ msg: "Invalid Authentication" });

    jwt.verify(token, process.env.access_token_secret, (err, user) => {
      if (err) return res.status(500).json({ msg: "Invalid Authentication" });

      req.user = user; //sending id of user to next
      next();
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = auth;
