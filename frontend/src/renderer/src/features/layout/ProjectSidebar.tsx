import React from 'react'
import { NavLink } from 'react-router-dom'
import { useProjectStore } from '@renderer/store/project-store'

type Props = {
    projectId: string;
};

const ProjectSidebar = ({projectId} : Props) => {
    const { projects } = useProjectStore();
    const project = projects.find(p => p.id === projectId);

    const base = `/projects/${projectId}`;
    const nav = [
        { to: `${base}`, label: 'Overview', end: true },
        { to: `${base}/tasks`, label: 'Tasks' },
        { to: `${base}/git`, label: 'Git' },
    ]
  return (
    <aside className='w-64'>
        ProjectSidebar - {project?.name}
    </aside>
  )
}

export default ProjectSidebar