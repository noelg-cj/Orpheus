import { create } from 'zustand';
import type { Task, ID } from '@shared/types';

type TasksByProject = Record<ID, Task[]>;

type TaskState = {
    tasksByProject: TasksByProject;
    loadingByProject: Record<ID, boolean>;
    errorByProject: Record<ID, string | null>;

    loadTasks: (projectId: ID) => Promise<void>;
    createTask: (projectId: ID, title: string) => Promise<Task | null>;
    updateTask: (id: ID, data: Partial<Task>) => Promise<Task | null>;
    deleteTask: (id: ID) => Promise<boolean>;
};

export const useTaskStore = create<TaskState>((set) => ({
    tasksByProject: {},
    loadingByProject: {},
    errorByProject: {},

    async loadTasks(projectId) {
        set((state) => ({
            loadingByProject: { ...state.loadingByProject, [projectId]: true },
            errorByProject: { ...state.errorByProject, [projectId]: null }
        }));

        try {
            const tasks = await window.api.tasks.listByProject({ projectId });
            set((state) => ({
                tasksByProject: { ...state.tasksByProject, [projectId]: tasks },
                loadingByProject: { ...state.loadingByProject, [projectId]: false }
            }));
        }
        catch (err) {
            console.error(`Failed to load tasks for project ${projectId}:`, err);
            set((state) => ({
                loadingByProject: { ...state.loadingByProject, [projectId]: false },
                errorByProject: { ...state.errorByProject, [projectId]: "Failed to load Tasks" },
            }));
        }
    },

    async createTask(projectId, title) {
        try {
            const task = await window.api.tasks.create({ projectId, title });
            set((state) => {
                const existing = state.tasksByProject[projectId] ?? [];
                return {
                    tasksByProject: {
                        ...state.tasksByProject,
                        [projectId]: [...existing, task],
                    },
                };
            });
            return task;
        }
        catch (err) {
            console.error("Failed to create task:", err);
            set((state) => ({
                errorByProject: { ...state.errorByProject, [projectId]: "Failed to create Task" }
            }));
            return null;
        }
    },

    async updateTask(id, data) {
        try {
            const updated = await window.api.tasks.update({ id, data });
            set((state) => {
                const tasksByProject: TasksByProject = {};
                for (const [projectId, tasks] of Object.entries(state.tasksByProject)) {
                    tasksByProject[projectId] = tasks.map(t => t.id === id ? updated : t);
                }
                return { tasksByProject }
            });
            return updated;
        }
        catch (err) {
            console.error("Failed to update task:", err);
            return null;
        }
    },

    async deleteTask(id) {
        try {
            await window.api.tasks.delete({ id });
            set((state) => {
                const tasksByProject: TasksByProject = {};
                for (const [projectId, tasks] of Object.entries(state.tasksByProject)) {
                    tasksByProject[projectId] = tasks.filter(t => t.id !== id);
                }
                return { tasksByProject };
            });
            return true;
        }
        catch (err) {
            console.error("Failed to delete task:", err);
            return false;
        }
    }
}))