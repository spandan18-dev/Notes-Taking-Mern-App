import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import RateLimitedUI from '../components/RateLimit.jsx'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import NoteCard from '../components/NoteCard.jsx'
import NotesNotFound from '../components/NotesNotFound.jsx'

const HomePage = () => {
  const [isratelimited ,setratelimited ] = useState(false)
  const [notes,setNotes] = useState([])
  const [loading , setLoading] = useState(true)

  useEffect(()=>{
    const fetchNotes = async () =>{
      try{
        const res = await axios.get("http://localhost:3000/api/notes")
        console.log(res.data)
        setNotes(res.data)
        setratelimited(false)
      }catch(error){
        console.log({message : "error fetching note",error : error})
        if(error.response.status === 429){
          setratelimited(true)
        }else{
          toast.error("Failed to load notes")
        }
    }

        finally{
          setLoading(false)
        }
      }

    fetchNotes();
  },[])


  return (
    <div className='min-h-screen'>
      <Navbar/>

      {isratelimited && <RateLimitedUI/>}

      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {loading && <div className='text-center text-emerald-950 py-10' >loading....</div> }

        {notes.length === 0 && !isratelimited && <NotesNotFound/>}

        {notes.length > 0 && !isratelimited && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {notes.map(note =>{
             return (
               <div>
                <NoteCard key={note._id} note={note} setNotes={setNotes} />
              </div>
             )
            })}
          </div>
        )}
      </div>

    </div>
  )
}

export default HomePage
 