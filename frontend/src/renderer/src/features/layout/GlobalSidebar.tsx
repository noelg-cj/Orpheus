import { useProjectStore } from '@renderer/store/project-store'
import React from 'react'
import { NavLink } from 'react-router-dom'

const GlobalSidebar = () => {
    const { projects, loadProjects } = useProjectStore();
    if (projects.length === 0) {
        loadProjects().catch(() => {}); 
    }

    const nav = [
        { to: '/dashboard', label: 'Dashboard' },
        { to: '/projects', label: 'Projects' },
        { to: '/settings', label: 'Settings' },
    ]
  return (
    <aside className='w-64 border-r'>
        GlobarSidebar
    </aside>
  )
}

export default GlobalSidebar