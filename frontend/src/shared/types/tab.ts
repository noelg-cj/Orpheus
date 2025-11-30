import { ID } from "./common";

export type TabType = 
    | "dashboard"
    | "projects"
    | "project_overview"
    | "project_tasks"
    | "project_git"
    | "settings"
    | "custom";

export type Tab = {
    id: ID;
    type: TabType;
    path: string;
    projectID?: ID | null;
    title: string;
    iconKey?: string | null;
    isDirty: boolean;
    sortOrder: number;
}
