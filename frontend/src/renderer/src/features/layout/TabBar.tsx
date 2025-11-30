import React from 'react'
import { useLocation } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { House, Plus } from 'lucide-react';

const TabBar = () => {
    const location = useLocation();
  return (
    <div className='bg-[#040510] w-screen h-10 flex items-center border-b border-blue-100/10'>
        <div className='p-2 px-4 border-r border-blue-100/10 flex items-center'>
          <img src={logo} alt="Logo" className='h-4 w-4 '/>
        </div>
        <div className='p-2 px-3 border-r border-blue-100/10 flex items-center hover:bg-blue-100/5 cursor-pointer'>
          <House size={18} className='text-blue-200/40 hover:text-blue-200/60'/>
        </div>
        <div className='p-2 flex items-center cursor-pointer'>
          <span className='p-1 hover:bg-blue-200/5 rounded-sm'>
            <Plus size={18} className='text-blue-200/40 hover:text-blue-200/60'/>
          </span>
        </div>
    </div>
  )
}

export default TabBar