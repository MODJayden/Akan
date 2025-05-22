const express = require("express");
const router = express.Router();
const passport = require("passport");
const { handleAvatarChange, updateUser } = require("../controller/user");

router.get("/login/success", (req, res) => {
  if (req.user) {
    return res
      .status(200)
      .json({ message: "Logged in successfully", data: req.user });
  } else {
    return res.status(401).json({ message: "User not found" });
  }
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect(process.env.CLIENT_URL || "http://localhost:5173");
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});
router.post("/avatar/:id", handleAvatarChange);
router.post("/update/user/:id", updateUser);

module.exports = router;
