import React, { useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import RateLimitedUI from '../components/RateLimit.jsx'

const HomePage = () => {
  const [isratelimited ,setratelimited ] = useState(false)
  return (
    <div className='min-h-screen'>
      <Navbar/>

      {isratelimited && <RateLimitedUI/>}
    </div>
  )
}

export default HomePage
