import React from 'react'
import GlobalSidebar from './GlobalSidebar'
import { Outlet } from 'react-router-dom'

const GlobalLayout = () => {
  return (
    <div className='flex flex-1 min-h-0'>
        <GlobalSidebar />
        <main className='flex-1 overflow-auto bg-background'>
            <Outlet />
        </main>
    </div>
  )
}

export default GlobalLayout