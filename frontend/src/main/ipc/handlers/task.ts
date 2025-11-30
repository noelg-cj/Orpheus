import { IPCChannels } from "@shared/types/ipc";
import type { Task } from "@shared/types";
import { registerIPCHandler } from "..";

const mockTasks: Task[] = [];

export function registerTaskHandlers() {
    registerIPCHandler(IPCChannels.TASK_LIST_BY_PROJECT, async(_event, req) => {
        return mockTasks.filter(t => t.projectId === req.projectId);
    });

    registerIPCHandler(IPCChannels.TASK_CREATE, async(_event, req) => {
        const now = new Date().toISOString();
        const task: Task = {
            id: crypto.randomUUID(),
            projectId: req.projectId,
            title: req.title,
            description: "",
            status: "todo",
            priority: "medium",
            setOrder: Date.now(),
            createdAt: now,
            updatedAt: now,
            dueDate: null,
            completedAt: null,
            linkedBranch: null,
            linkedIssueRef: null
        };

        mockTasks.push(task);
        return task;
    });

    registerIPCHandler(IPCChannels.TASK_UPDATE, async(_event, req) => {
        const idx = mockTasks.findIndex(t => t.id === req.id);
        if (idx === -1) throw new Error("Task not found");

        const updated: Task = {
            ...mockTasks[idx],
            ...req.data,
            updatedAt: new Date().toISOString()
        };

        mockTasks[idx] = updated;
        return updated;
    });

    registerIPCHandler(IPCChannels.TASK_DELETE, async(_event, req) => {
        const idx = mockTasks.findIndex(t => t.id === req.id);
        if (idx === -1) throw new Error("Task not found");
        mockTasks.splice(idx, 1);
        return { success: true };
    });
}