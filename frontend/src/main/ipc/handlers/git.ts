import { IPCChannels } from "@/shared/types/ipc";
import { registerIPCHandler } from "..";

export function registerGitHandlers() {
    registerIPCHandler(IPCChannels.GIT_STATUS, async(_event, req) => {
        console.log("Git status called for project", req.projectId);
        return {
            branch: null,
            changed: 0,
            staged: 0,
            untracked: 0,
            ahead: 0,
            behind: 0,
            files: []
        };
    });

    registerIPCHandler(IPCChannels.GIT_COMMIT, async(_event, req) => {
        console.log("Git commit called", req);
        return { success: true };
    });

    registerIPCHandler(IPCChannels.GIT_PULL, async(_event, req) => {
        console.log("Git pulled called", req);
        return { success: true };
    });

    registerIPCHandler(IPCChannels.GIT_PUSH, async(_event, req) => {
        console.log("Git push called", req);
        return { success: true };
    });

    registerIPCHandler(IPCChannels.GIT_LOG, async(_event, req) => {
        console.log("Git log called", req);
        return [];
    });
}