import { create } from 'zustand';
import type { ID } from '@shared/types';
import type { GitStatusResponse, GitLogResponse } from '@shared/types/ipc';

type GitState = {
    statusByProject: Record<ID, GitStatusResponse | null>;
    logByProject: Record<ID, GitLogResponse | null>;
    loadingStatusByProject: Record<ID, boolean>;
    loadingLogByProject: Record<ID, boolean>;
    errorByProject: Record<ID, string | null>;

    loadStatus: (projectId: ID) => Promise<void>;
    loadLog: (projectId: ID) => Promise<void>;
    commit : (projectId: ID, message: string) => Promise<boolean>;
    pull : (projectId: ID) => Promise<boolean>;
    push : (projectId: ID) => Promise<boolean>;
};

export const useGitStore = create<GitState>((set) => ({
    statusByProject: {},
    logByProject: {},
    loadingStatusByProject: {},
    loadingLogByProject: {},
    errorByProject: {},

    async loadStatus(projectId) {
        set((state) => ({
            loadingStatusByProject: { ...state.loadingStatusByProject, [projectId]: true },
            errorByProject: { ...state.errorByProject, [projectId]: null }
        }));

        try {
            const status = await window.api.git.status({ projectId });
            set((state) => ({
                statusByProject: { ...state.statusByProject, [projectId]: status },
                loadingStatusByProject: { ...state.loadingStatusByProject, [projectId]: false }
            }));
        } catch (err) {
            console.error(`Failed to load git status for project ${projectId}:`, err);
            set((state) => ({
                loadingStatusByProject: { ...state.loadingStatusByProject, [projectId]: false },
                errorByProject: { ...state.errorByProject, [projectId]: "Failed to load Git Status" },
            }));
        }
    },

    async loadLog(projectId) {
        set((state) => ({
            loadingLogByProject: { ...state.loadingLogByProject, [projectId]: true },
            errorByProject: { ...state.errorByProject, [projectId]: null }
        }));

        try {
            const log = await window.api.git.log({ projectId, limit: 50 });
            set((state) => ({
                logByProject: { ...state.logByProject, [projectId]: log },
                loadingLogByProject: { ...state.loadingLogByProject, [projectId]: false }
            }));
        }
        catch (err) {
            console.error(`Failed to load git log for project ${projectId}:`, err);
            set((state) => ({
                loadingLogByProject: { ...state.loadingLogByProject, [projectId]: false },
                errorByProject: { ...state.errorByProject, [projectId]: "Failed to load Git Log" },
            }));
        }
    },

    async commit(projectId, message) {
        try {
            await window.api.git.commit({ projectId, message });
            return true;
        } catch (err) {
            console.error(`Failed to commit for project ${projectId}:`, err);
            return false;
        }
    },

    async pull (projectId) {
        try {
            await window.api.git.pull({ projectId });
            return true;
        } catch (err) {
            console.error(`Failed to pull for project ${projectId}:`, err);
            return false;
        }
    },

    async push (projectId) {
        try {
            await window.api.git.push({ projectId });
            return true;
        } catch (err) {
            console.error(`Failed to push for project ${projectId}:`, err);
            return false;
        }
    },
}));