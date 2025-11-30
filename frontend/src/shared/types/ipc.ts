import type { Project, Task } from './index';

export type ProjectListRequest = void;
export type ProjectListResponse = Project[];

// Projects
export type ProjectCreateRequest = {
    name: string;
    path: string;
    editorCommand: string;
}
export type ProjectCreateResponse = Project;

export type ProjectUpdateRequest = {
    id: string;
    data: Partial<Project>;
}
export type ProjectUpdateResponse = Project;

export type ProjectDeleteRequest = {
    id: string;
}
export type ProjectDeleteResponse = { success: true };

// Tasks
export type TaskListByProjectRequest = {
    projectId: string;
}
export type TaskListByProjectResponse = Task[];

export type TaskCreateRequest = {
    projectId: string;
    title: string;
}
export type TaskCreateResponse = Task;

export type TaskUpdateRequest = {
    id: string;
    data: Partial<Task>;
}
export type TaskUpdateResponse = Task;

export type TaskDeleteRequest = {
    id: string;
}
export type TaskDeleteResponse = { success: true };

// git
export type GitStatusRequest = {
    projectId: string;
}
export type GitStatusResponse = {
    branch: string | null;
    changed: number;
    staged: number;
    untracked: number;
    ahead: number;
    behind: number;
    files: {
        path: string;
        status: string;
    }[];
}

export type GitCommitRequest = {
    projectId: string;
    message: string;
}
export type GitCommitResponse = { success: true };

export type GitPullRequest = {
    projectId: string;
}
export type GitPullResponse = { success: true };

export type GitPushRequest = {
    projectId: string;
}
export type GitPushResponse = { success: true };

export type GitLogRequest = {
    projectId: string;
    limit?: number;
}
export type GitLogResponse = {
    hash: string;
    author: string;
    date: string;
    message: string;
}[];

// system 
export type OpenEditorRequest = {
    path: string;
    command: string;
};
export type OpenEditorResponse = { success: true };

export type WindowActionRequest = 'minimize' | 'maximize' | 'close';
export type WindowActionResponse = void;

// ipc channels
export const IPCChannels = {
    PROJECT_LIST: "project:list",
    PROJECT_CREATE: "project:create",
    PROJECT_UPDATE: "project:update",
    PROJECT_DELETE: "project:delete",

    TASK_LIST_BY_PROJECT: "task:list-by-project",
    TASK_CREATE: "task:create",
    TASK_UPDATE: "task:update",
    TASK_DELETE: "task:delete",

    GIT_STATUS: "git:status",
    GIT_COMMIT: "git:commit",
    GIT_PULL: "git:pull",
    GIT_PUSH: "git:push",
    GIT_LOG: "git:log",

    OPEN_EDITOR: "system:open-editor",
    WINDOW_ACTION: "system:window-action",
} as const;

export type IPCChannel = typeof IPCChannels[keyof typeof IPCChannels];

// preload api
export type PreloadAPI = {
    projects: {
        list(): Promise<ProjectListResponse>;
        create(req: ProjectCreateRequest): Promise<ProjectCreateResponse>;
        update(req: ProjectUpdateRequest): Promise<ProjectUpdateResponse>;
        delete(req: ProjectDeleteRequest): Promise<ProjectDeleteResponse>;
    };

    tasks: {
        listByProject(req: TaskListByProjectRequest): Promise<TaskListByProjectResponse>;
        create(req: TaskCreateRequest): Promise<TaskCreateResponse>;
        update(req: TaskUpdateRequest): Promise<TaskUpdateResponse>;
        delete(req: TaskDeleteRequest): Promise<TaskDeleteResponse>;
    };

    git: {
        status(req: GitStatusRequest): Promise<GitStatusResponse>;
        commit(req: GitCommitRequest): Promise<GitCommitResponse>;
        pull(req: GitPullRequest): Promise<GitPullResponse>;
        push(req: GitPushRequest): Promise<GitPushResponse>;
        log(req: GitLogRequest): Promise<GitLogResponse>;
    };

    system: {
        openEditor(req: OpenEditorRequest): Promise<OpenEditorResponse>;
        windowAction(action: WindowActionRequest): void;
    };
}

// main process
export type IPCHandlerMap = {
    [IPCChannels.PROJECT_LIST]: {
        req: ProjectListRequest;
        res: ProjectListResponse;
    };
    [IPCChannels.PROJECT_CREATE]: {
        req: ProjectCreateRequest;
        res: ProjectCreateResponse;
    };
    [IPCChannels.PROJECT_UPDATE]: {
        req: ProjectUpdateRequest;
        res: ProjectUpdateResponse;
    };
    [IPCChannels.PROJECT_DELETE]: {
        req: ProjectDeleteRequest;
        res: ProjectDeleteResponse;
    };

    [IPCChannels.TASK_LIST_BY_PROJECT]: {
        req: TaskListByProjectRequest;
        res: TaskListByProjectResponse;
    };
    [IPCChannels.TASK_CREATE]: {
        req: TaskCreateRequest;
        res: TaskCreateResponse;
    };
    [IPCChannels.TASK_UPDATE]: {
        req: TaskUpdateRequest;
        res: TaskUpdateResponse;
    };
    [IPCChannels.TASK_DELETE]: {
        req: TaskDeleteRequest;
        res: TaskDeleteResponse;
    };

    [IPCChannels.GIT_STATUS]: {
        req: GitStatusRequest;
        res: GitStatusResponse;
    };
    [IPCChannels.GIT_COMMIT]: {
        req: GitCommitRequest;
        res: GitCommitResponse;
    };
    [IPCChannels.GIT_PULL]: {
        req: GitPullRequest;
        res: GitPullResponse;
    };
    [IPCChannels.GIT_PUSH]: {
        req: GitPushRequest;
        res: GitPushResponse;
    };
    [IPCChannels.GIT_LOG]: {
        req: GitLogRequest;
        res: GitLogResponse;
    };

    [IPCChannels.OPEN_EDITOR]: {
        req: OpenEditorRequest;
        res: OpenEditorResponse;
    };
    [IPCChannels.WINDOW_ACTION]: {
        req: WindowActionRequest;
        res: WindowActionResponse;
    };
}
