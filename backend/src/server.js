require("dotenv").config();

const express = require("express");
const session = require("express-session");
const path = require("path");

const loginRoutes = require("./routes/login");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("trust proxy", 1);

app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    },
  })
);

function requireLogin(req, res, next) {
  if (!req.session.userId) {
    return res.redirect("/");
  }

  next();
}

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Node.js backend is running!",
  });
});

app.use("/api/login", loginRoutes);

app.get("/api/dashboard", requireLogin, (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/private/dashboard.html"));
});

app.listen(PORT, "127.0.0.1", () => {
  console.log(`Node.js backend running at http://127.0.0.1:${PORT}`);
});
