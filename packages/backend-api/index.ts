import express from "express";
import { getNewsItem, newsList } from "./packages/backend-api/src/news";



const app = express();
const port = 8080;

app.get("/api/news", (req, res) => {
  res.json(newsList);
});

app.get("/api/news/:id", (req, res) => {
  const news = getNewsItem(Number(req.params.id));
  if (news) {
    res.json(news);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

app.listen(port, () => {
  console.log(`✅ Backend API server is running on http://localhost:${port}`);
});