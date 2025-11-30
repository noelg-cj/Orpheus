import { IPCChannels } from "@shared/types/ipc";
import type { Project } from "@shared/types";
import { registerIPCHandler } from "..";

const mockProjects: Project[] = [];

export function registerProjectHandlers() {
    registerIPCHandler(IPCChannels.PROJECT_LIST, async() => {
        return mockProjects;
    })

    registerIPCHandler(IPCChannels.PROJECT_CREATE, async(_event, req) => {
        const now = new Date().toISOString();
        const project: Project = {
            id: crypto.randomUUID(),
            name: req.name,
            path: req.path,
            color: null,
            icon: null,
            git: {
                isRepo: false,
                defaultBranch: null,
                lastKnownBranch: null,
                remoteUrl: null
            },
            editor: {
                command: req.editorCommand,
                args: []
            },
            createdAt: now,
            updatedAt: now,
            lastOpenedAt: now,
            pinned: false,
            archived: false,
            templateID: null
        };

        mockProjects.push(project);
        return project;
    });

    registerIPCHandler(IPCChannels.PROJECT_UPDATE, async(_event, req) => {
        const idx = mockProjects.findIndex(p => p.id === req.id);
        if (idx === -1) throw new Error("Project not found");

        const updated: Project = {
            ...mockProjects[idx],
            ...req.data,
            updatedAt: new Date().toISOString()
        };

        mockProjects[idx] = updated;
        return updated;
    });

    registerIPCHandler(IPCChannels.PROJECT_DELETE, async(_event, req) => {
        const idx = mockProjects.findIndex(p => p.id === req.id);
        if (idx === -1) throw new Error("Project not found");

        mockProjects.splice(idx, 1);
        return { success: true };
    });
}
