import axios from 'axios'
import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'
import {toast} from 'react-hot-toast'

const NoteCard = ({ note  , setNotes}) => {

  
  const handleDel = async (e,id )=>{
    e.preventDefault();

    if(!window.confirm("Are you sure to delete this note")) return

    try {
      await axios.delete(`http://localhost:3000/api/notes/${id}`)
      setNotes((prev)=>prev.filter(note=>note._id != id))
      toast.success("Notes deleted Sucesfully...")

    } catch (error) {
      toast.error("Failed to delete")
    }
  }

  return (
    <Link 
      to={`/note/${note._id}`} 
      className='card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00ff9d]'
    >
      <div className='card-body'>
        <h3 className='card-title text-ba se-content'>{note.title}</h3>
        <p className='text-base-content/70 line-clamp-3'>{note.content}</p>
        <div className='card-actions justify-between items-center mt-4'>
          <span className='text-sm text-base-content/60'>
            {new Date(note.createdAt).toLocaleDateString()}
          </span>
          <div className='flex items-center gap-1'>
            <PenSquareIcon className='size-4' />
            <button onClick={(e)=> handleDel(e,note._id)} className='btn btn-ghost btn-xs text-error'>
              <Trash2Icon className='size-4' />
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default NoteCard
