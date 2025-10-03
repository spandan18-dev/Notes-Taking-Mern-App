import express from 'express';
import debug from 'debug';
import dotenv from 'dotenv';
import connectDB from './DataBase/ConnectDB.js';
import rateLimmiter from './middlewares/ratelim.js';
import cors from 'cors';
import path from 'path';

const app = express();
const applog = debug("dev:applog");
dotenv.config();

const __dirname = path.resolve();

// Middlewares
if (process.env.NODE_ENV !== "production") {
  app.use(cors({
    origin: "http://localhost:5173"
  }));
}
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(rateLimmiter);

// Routes
import router from './Routes/notes.routes.js';
app.use("/api/notes", router);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Frontend/dist")));

  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend/dist", "index.html"));
  });
}

// fetch data from dotenv
const port = process.env.PORT || 5000;
const dburl = process.env.MONGODBURL;

// Db Connection
connectDB(dburl).then(() => {
  app.listen(port, () => {
    applog(`🚀 Server running at http://localhost:${port}`);
  });
});
