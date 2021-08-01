const router = require("express").Router();
const {
  register,
  refreshToken,
  login,
  logout,
  getUser,
} = require("../controllers/userCtrl");
const auth = require("../middleware/auth");

router.post("/register", register);

router.post("/login", login);

router.get("/logout", logout);

router.get("/refresh_token", refreshToken);

router.get("/infor", auth, getUser);

module.exports = router;
