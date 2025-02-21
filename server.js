import express from "express";
import mongoose from "mongoose";
const app = express();
app.use(express.json());
// Kết nối db
mongoose.connect(`mongodb://127.0.0.1:27017/thi_thu_nodejs`);

// routers

export const viteNodeApp = app;
