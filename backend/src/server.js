require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/api/health", (req, res) => {

    res.json({
        status: "OK",
        message: "Node.js backend is running!"
    });

});

app.listen(PORT, "127.0.0.1", () => {

    console.log(
        `Node.js backend running at http://127.0.0.1:${PORT}`
    );

});
