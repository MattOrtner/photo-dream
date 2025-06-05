// filepath: /api/data.js
import { fetchPhotos } from "../unsplash";

export default async function handler(req, res) {
  const searchQuery = req.query.query || "corgis";
  try {
    const response = await fetchPhotos(searchQuery);
    if (!response || response.length === 0) {
      return res.status(404).json({ error: "No photos found" });
    }
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch API data" });
  }
}
