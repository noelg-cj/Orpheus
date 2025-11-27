import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'

const AppRoot = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default AppRoot