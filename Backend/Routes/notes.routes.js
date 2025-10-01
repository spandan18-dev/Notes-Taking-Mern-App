import express from 'express'
const router = express.Router();

// Import controllers :
import {
    get,
    post,
    put,
    del
} from '../Components/Notes.components.js'

router.get("/",get)
router.post("/",post)
router.put("/:id",put)
router.delete("/:id",del)

export default router
