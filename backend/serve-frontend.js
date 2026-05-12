const path = require("path");

// ...existing code above...

// Serve frontend static files
const buildPath = path.join(__dirname, "../frontend/build");
app.use(express.static(buildPath));

// Fallback: serve index.html for any non-API route (for React Router)
app.get("*", (req, res) => {
    if (req.path.startsWith("/api/"))
        return res.status(404).json({ error: "API route not found" });
    res.sendFile(path.join(buildPath, "index.html"));
});

// ...existing code below...
