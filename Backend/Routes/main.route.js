import express from 'express'
const router = express.Router();

// Import controllers :
import {
    get,
    post,
    put,
    del
} from '../Components/main.logic.js'

router.get("/api/notes",get)
router.post("/api/notes",post)
router.put("/api/notes/:id",put)
router.delete("/api/notes/:id",del)

export default router