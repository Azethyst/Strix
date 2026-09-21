const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../services/db");

const router = express.Router();

router.post("/check-email", async (req, res, next) => {
  try {
    const email = String(req.body.email || "")
      .trim()
      .toLowerCase();

    const result = await db.query("SELECT id FROM users WHERE email = $1", [
      email,
    ]);

    res.json({
      exists: result.rowCount > 0,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const email = String(req.body.email || "")
      .trim()
      .toLowerCase();
    const password = String(req.body.password || "");

    const result = await db.query(
      "SELECT id, email, password_hash FROM users WHERE email = $1",
      [email],
    );

    const user = result.rows[0];

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    req.session.userId = user.id;

    req.session.save((error) => {
      if (error) {
        return next(error);
      }

      res.json({
        success: true,
        redirect: "/api/dashboard",
      });
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
