import React from 'react'
import { Outlet, useParams } from "react-router-dom";
import ProjectSidebar from "./ProjectSidebar";

const ProjectLayout = () => {
  const { projectId } = useParams<{ projectId: string }>();

  if (!projectId) {
    return <div className="p-6 text-sm text-red-400">No project selected.</div>;
  }

  return (
    <div className="flex flex-1 min-h-0">
      <ProjectSidebar projectId={projectId} />
      <main className="flex-1 overflow-auto bg-background">
        <Outlet />
      </main>
    </div>
  );
}

export default ProjectLayout;
