import { create } from 'zustand';
import type { Project, ID } from '@shared/types';

type ProjectState = {
    projects: Project[];
    loading: boolean;
    error: string | null;
    selectedProjectId: ID | null;

    loadProjects: () => Promise<void>;
    createProject: (input: { name: string; path: string; editorCommand: string }) => Promise<Project | null>;
    updateProject: (id: ID, data: Partial<Project>) => Promise<Project | null>;
    deleteProject: (id: ID) => Promise<boolean>;
    selectProject: (id: ID | null) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
    projects: [],
    loading: false,
    error: null,
    selectedProjectId: null,

    async loadProjects() {
        set({ loading: true, error: null });
        try {
            const projects = await window.api.projects.list();
            set({ projects, loading: false });
        } catch (err) {
            console.error("Failed to load projects:", err);
            set({ error: (err as Error).message, loading: false });
        }
    },

    async createProject(input) {
        try {
            const project = await window.api.projects.create(input);
            set((state) => ({
                projects: [...state.projects, project],
                selectProjectId: project.id
            }));
            return project;
        } catch (err) {
            console.error("Failed to create project:", err);
            set({ error: (err as Error).message });
            return null;
        }
    },

    async updateProject(id, data) {
        try {
            const updated = await window.api.projects.update({ id, data });
            set((state) => ({
                projects: state.projects.map(p => p.id === id ? updated : p)
            }))
            return updated;
        } catch (err) {
            console.error("Failed to update project:", err);
            set({ error: (err as Error).message });
            return null;
        }
    },

    async deleteProject(id) {
        try {
            await window.api.projects.delete({ id });
            set((state) => ({
                projects: state.projects.filter(p => p.id !== id),
                selectedProjectId: state.selectedProjectId === id ? null : state.selectedProjectId
            }));
            return true;
        } catch (err) {
            console.error("Failed to delete project:", err);
            set({ error: (err as Error).message });
            return false;
        }
    },

    selectProject(id) {
        set({ selectedProjectId: id });
    }
}))