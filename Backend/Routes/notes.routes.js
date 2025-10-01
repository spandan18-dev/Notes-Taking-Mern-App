import express from 'express'
const router = express.Router();

// Import controllers :
import {
    get,
    getbyid,
    post,
    put,
    del
} from '../Components/Notes.components.js'

router.get("/",get)
router.get("/:id",getbyid)
router.post("/",post)
router.put("/:id",put)
router.delete("/:id",del)

export default router
