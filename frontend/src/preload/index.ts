import { contextBridge, ipcRenderer } from "electron";
import { electronAPI } from "@electron-toolkit/preload";
import type { PreloadAPI, IPCHandlerMap } from "@shared/types/ipc";
import { IPCChannels } from "@shared/types/ipc";

console.log("🔥 Preload script loaded");

// Generic invoke wrapper for typed IPC calls
function invoke<K extends keyof IPCHandlerMap>(
  channel: K,
  req: IPCHandlerMap[K]["req"]
): Promise<IPCHandlerMap[K]["res"]> {
  return ipcRenderer.invoke(channel, req);
}

// Generic send wrapper for fire-and-forget channels
function send<K extends keyof IPCHandlerMap>(
  channel: K,
  req: IPCHandlerMap[K]["req"]
): void {
  ipcRenderer.send(channel, req);
}

const api: PreloadAPI = {
  projects: {
    list: () => invoke(IPCChannels.PROJECT_LIST, undefined),
    create: (req) => invoke(IPCChannels.PROJECT_CREATE, req),
    update: (req) => invoke(IPCChannels.PROJECT_UPDATE, req),
    delete: (req) => invoke(IPCChannels.PROJECT_DELETE, req),
  },
  tasks: {
    listByProject: (req) => invoke(IPCChannels.TASK_LIST_BY_PROJECT, req),
    create: (req) => invoke(IPCChannels.TASK_CREATE, req),
    update: (req) => invoke(IPCChannels.TASK_UPDATE, req),
    delete: (req) => invoke(IPCChannels.TASK_DELETE, req),
  },
  git: {
    status: (req) => invoke(IPCChannels.GIT_STATUS, req),
    commit: (req) => invoke(IPCChannels.GIT_COMMIT, req),
    pull: (req) => invoke(IPCChannels.GIT_PULL, req),
    push: (req) => invoke(IPCChannels.GIT_PUSH, req),
    log: (req) => invoke(IPCChannels.GIT_LOG, req),
  },
  system: {
    openEditor: (req) => invoke(IPCChannels.OPEN_EDITOR, req),
    windowAction: (action) => send(IPCChannels.WINDOW_ACTION, action),
  },
};

// Expose to renderer
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("electron", electronAPI);
    contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error("Error exposing APIs in preload:", error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
