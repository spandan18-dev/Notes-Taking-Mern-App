import React from 'react'
import {Link} from 'react-router'
import {PlusIcon} from 'lucide-react'

const Navbar = () => {
  return (
    <header className='bg-base-300 border-b border-base-content/10'>
    <div className='mx-auto max-w-6xl p-4'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold font-mono tracking-tight text-emerald-500'>
            NoteHook
        </h1>
        <div className='flex items-center gap-4 rounded-b-4xl '>
            <Link to={"/create"} className='btn bg-emerald-500'>
                <PlusIcon className='size-5 text-black'/>
                <span className='text-black'>New</span>
            </Link>
        </div>
      </div>
    </div>
    </header>
  )
}
export default Navbar
