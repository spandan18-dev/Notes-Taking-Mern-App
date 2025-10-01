import {Ratelimit} from '@upstash/ratelimit'
import {Redis} from '@upstash/redis'

import dotenv from 'dotenv' ; dotenv.config();

// i want to allow 10 request for 20 sec

const ratelimit = new Ratelimit({
    redis :Redis.fromEnv(),
    limiter:Ratelimit.slidingWindow(10,"20 s")
})

export default ratelimit