import { createBrowserRouter } from "react-router-dom";
import AppFrame from "./AppFrame";
import GlobalLayout from "@renderer/features/layout/GlobalLayout";
import ProjectLayout from "@renderer/features/layout/ProjectLayout";

const DashboardPage = () => <div>Dashboard Page</div>;
const ProjectsPage = () => <div>Projects Page</div>;
const ProjectDetailsPage = () => <div>Project Details Page</div>;
const ProjectTasksPage = () => <div>Project Tasks Page</div>;
const ProjectGitPage = () => <div>Project Git Page</div>;
const SettingsPage = () => <div>Settings Page</div>;

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AppFrame />,
        children: [
            {
                element: <GlobalLayout />,
                children: [
                    { index: true, element: <DashboardPage /> },
                    { path: "dashboard", element: <DashboardPage /> },
                    { path: "projects", element: <ProjectsPage /> },
                    { path: "settings", element: <SettingsPage /> },
                ]
            },
            { 
                path: "projects/:projectId",
                element: <ProjectLayout />,
                children: [
                    { index: true, element: <ProjectDetailsPage /> },
                    { path: "tasks", element: <ProjectTasksPage /> },
                    { path: "git", element: <ProjectGitPage /> },
                ]
            }
        ],
    }
])