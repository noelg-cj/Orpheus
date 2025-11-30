import { BrowserWindow } from "electron";
import { spawn } from "child_process";
import { IPCChannels } from "@shared/types/ipc";
import { registerIPCHandler } from "..";

export function registerSystemHandlers() {
    registerIPCHandler(IPCChannels.OPEN_EDITOR, async(_event, req) => {
        const child = spawn(req.command, [req.path], {
            detached: true,
            stdio: "ignore"
        });
        child.unref();
        return { success: true };
    });

    const { ipcMain } = require("electron");

    ipcMain.on(IPCChannels.WINDOW_ACTION, (_event, action) => {
        const win = BrowserWindow.fromWebContents(_event.sender);
        if (!win) return;

        switch(action) {
            case "minimize":
                win.minimize();
                break;
            case "maximize":
                win.isMaximized() ? win.unmaximize() : win.maximize();
                break;
            case "close":
                win.close();
                break;
        }
    });
}