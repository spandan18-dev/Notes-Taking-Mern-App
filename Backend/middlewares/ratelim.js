import ratelimit from '../config/upstach.js'
import debug from 'debug'; const redislog =debug("dev:redis")

const rateLimmiter = async (req,res,next)=>{

    try{
        const {success} = await ratelimit.limit("my-limit-key")
        if (!success) return res.status(429).json({
            message : "Too many Requests , please try again later "
        })
        next()
    }catch(err){
        redislog(err);
        next(err)
    }
}
export default rateLimmiter