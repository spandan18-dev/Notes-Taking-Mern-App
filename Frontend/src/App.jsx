import React from 'react'
import {Route, Routes} from 'react-router'
import HomePage from './pages/homePage.jsx'
import CreatePage from './pages/CreatePage.jsx'
import DetailNotePage from './pages/DetailNotePage.jsx'
import {toast} from 'react-hot-toast'

function App() {
  return (
    <div data-theme={"forest"}>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/create' element={<CreatePage/>} />
        <Route path='/note/:id' element={<DetailNotePage/>} />
      </Routes>
    </div>
  )
}

export default App
