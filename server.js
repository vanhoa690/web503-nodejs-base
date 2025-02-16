import express from "express";
const app = express();

// Middleware để phân tích JSON và form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json("home");
});

export const viteNodeApp = app;
