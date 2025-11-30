import { ipcMain } from "electron";
import { IPCHandlerMap } from "@/shared/types/ipc";
import { registerProjectHandlers } from "./handlers/project";
import { registerGitHandlers } from "./handlers/git";
import { registerSystemHandlers } from "./handlers/system";
import { registerTaskHandlers } from "./handlers/task";


export function registerIPCHandler<K extends keyof IPCHandlerMap>(
  channel: K,
  handler: (
    event: Electron.IpcMainInvokeEvent,
    req: IPCHandlerMap[K]["req"]
  ) => Promise<IPCHandlerMap[K]["res"]> | IPCHandlerMap[K]["res"]
) {
  ipcMain.handle(channel, async (event, req) => {
    return handler(event, req as IPCHandlerMap[K]["req"]);
  });
}

export function registerIPCHandlers() {
    registerProjectHandlers();
    registerGitHandlers();
    registerSystemHandlers();
    registerTaskHandlers();
}