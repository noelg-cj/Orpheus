import CommandBar from '@renderer/features/layout/CommandBar'
import TabBar from '@renderer/features/layout/TabBar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const AppFrame = () => {
  return (
    <div>
      <TabBar />
      <div className='flex flex-1 min-h-0'>
        <Outlet />
      </div>
      <CommandBar />
    </div>
  )
}

export default AppFrame