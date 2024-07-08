const express = require("express");
const router = express.Router();
const {
  handleRegister,
  getMyProfile,
  handleLogin,
  handleLogout,
} = require("../controllers/user");
const { isAuthenticated } = require("../middlewares/auth");

router.post("/register", handleRegister);
router.post("/login", handleLogin);
router.get("/logout", handleLogout);

router.get("/me", isAuthenticated, getMyProfile);

module.exports = router;
