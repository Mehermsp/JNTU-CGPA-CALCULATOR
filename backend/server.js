const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const semesterRoutes = require("./routes/semesters");

const app = express();

app.use(
    cors({
        origin:
            process.env.CLIENT_URL ||
            "https://jntu-cgpa-calculator-1.onrender.com",
        credentials: true,
    })
);
app.use(express.json());

// Prevent noisy 404s when browsers request favicon from API host
app.get("/favicon.ico", (req, res) => res.status(204).end());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/semesters", semesterRoutes);

app.get("/api/health", (req, res) =>
    res.json({ status: "OK", message: "JNTU CGPA API running" })
);

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI || "mongodb://localhost:27017/jntu_cgpa")
    .then(() => {
        console.log("MongoDB connected");
        const PORT = process.env.PORT || 5000;

        // Serve frontend only if build exists (for local/dev use)
        const fs = require("fs");
        const buildPath = path.join(__dirname, "../frontend/build");
        if (fs.existsSync(path.join(buildPath, "index.html"))) {
            app.use(express.static(buildPath));
            app.get("*", (req, res) => {
                if (req.path.startsWith("/api/"))
                    return res
                        .status(404)
                        .json({ error: "API route not found" });
                res.sendFile(path.join(buildPath, "index.html"));
            });
        }

        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    });

module.exports = app;
