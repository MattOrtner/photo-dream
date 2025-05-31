const express = require("express");
const path = require("path");
const { fetchPhotos } = require("./unsplash");
require("dotenv").config();
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/config.js", (req, res) => {
  const protocol = req.protocol;
  const apiUrl = `${protocol}://${req.headers.host}/`;
  res.set("Content-Type", "application/javascript");
  res.send(`window.APP_CONFIG = { EXPRESS_API_URL: "${apiUrl}" };`);
});

const corsOptions = {
  origin:
    "https://photo-dream.vercel.app/" ||
    "http://localhost:5000/" ||
    "https://photo-dream-test.vercel.app/",
  methods: "GET",
};

app.get("/api/data", cors(corsOptions), async (req, res) => {
  console.log("Server received request");
  const searchQuery = req.query.query || "corgis";
  try {
    const response = await fetchPhotos(searchQuery);
    if (!response || response.length === 0) {
      console.error("No photos found for the query:", searchQuery);
      return res.status(404).json({ error: "No photos found" });
    }
    console.log("Returning response");
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch API data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
