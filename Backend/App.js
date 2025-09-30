import express from 'express'
const app = express()

import debug from 'debug' ; const applog = debug("dev:applog")
import dotenv from 'dotenv'; dotenv.config()
import connectDB from './DataBase/ConnectDB.js'

// Routes 
import router from './Routes/main.route.js';
app.use("/",router)

// fetch data from dotenv
const port = process.env.PORT
const dburl = process.env.MONGODBURL

// Db Connection
connectDB(dburl)

app.listen(port,()=>{
    applog(`server up ! http://localhost:${port}`)
})