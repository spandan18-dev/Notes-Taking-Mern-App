import express from 'express';
const app = express();

import debug from 'debug' ; const applog = debug("dev:applog");
import dotenv from 'dotenv'; dotenv.config();
import connectDB from './DataBase/ConnectDB.js';
import rateLimmiter from './middlewares/ratelim.js'
import cors from 'cors'

// Middlewares 
app.use(cors({
    origin : "http://localhost:5173"
}))
app.use(express.urlencoded({extended :true}))
app.use(express.json())
app.use(rateLimmiter)


// Routes 
import router from './Routes/notes.routes.js';
app.use("/api/notes",router)

// fetch data from dotenv
const port = process.env.PORT;
const dburl = process.env.MONGODBURL;

// Db Connection
connectDB(dburl).then(()=>{
app.listen(port,()=>{
    applog(`server up ! http://localhost:${port}`)
});
})
