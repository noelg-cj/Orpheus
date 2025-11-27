import { createBrowserRouter } from "react-router-dom";
import AppShell from "./AppShell";

const Placehlolder = ({name} : {name: string}) => {
    return <div>{name} Page</div>
}

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AppShell />,
        children: [
            { index: true, element: <Placehlolder name="Dashboard" /> },
            { path: "dashboard", element: <Placehlolder name="Dashboard" /> },
            { path: "projects", element: <Placehlolder name="Projects" /> },
            { path: "projects/:id", element: <Placehlolder name="Project Details" /> },
            { path: "projects/:id/tasks", element: <Placehlolder name="Project Tasks" /> },
            { path: "projects/:id/git", element: <Placehlolder name="Project Git" /> },
            { path: "settings", element: <Placehlolder name="Settings" /> },
        ]
    }
])