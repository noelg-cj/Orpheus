import { useProjectStore } from '@renderer/store/project-store'
import React from 'react'
import { NavLink } from 'react-router-dom'

const GlobalSidebar: React.FC = () => {
  const projects = useProjectStore((state) => state.projects)
  const loadProjects = useProjectStore((state) => state.loadProjects)

  React.useEffect(() => {
    // Just load on mount. If you want, later add a hasLoaded flag.
    void loadProjects().catch(() => {
      // TODO: error handling
    })
  }, [loadProjects])

  const nav = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/projects', label: 'Projects' },
    { to: '/settings', label: 'Settings' },
  ]

  return (
    <aside className="w-64 border-r">
      GlobalSid
    </aside>
  )
}

export default GlobalSidebar
