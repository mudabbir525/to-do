import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-around bg-slate-800 text-white'>
        <div className="logo">
            <span className="font-bold text-xl mx-8">Task Master</span>
        </div>
        <ul className="flex gap-8 mx-9">
        <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all'>My Tasks</li>
        </ul>

    </nav>
  )
}

export default Navbar
