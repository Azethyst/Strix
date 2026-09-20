const express = require("express");

const router = express.Router();

router.post("/", (req, res) => {
  const { email } = req.body;

  // Validate the user/password first.
  req.session.userId = email;

  res.redirect(303, "/api/dashboard");
});

module.exports = router;
