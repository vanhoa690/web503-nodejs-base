import express from 'express';
import mongoose from 'mongoose';
import router from './routes';
const app = express();
app.use(express.json());
// Kết nối db
mongoose.connect(`mongodb://127.0.0.1:27017/thi_thu_nodejs`);

// routers
app.use('/', router);
export const viteNodeApp = app;
