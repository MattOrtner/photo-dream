const express = require("express");
const path = require("path");
const { fetchPhotos } = require("./unsplash");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/data", async (req, res) => {
  console.log("Server received request");
  try {
    const response = await fetchPhotos("nature");
    console.log("Returning response");
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch API data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
