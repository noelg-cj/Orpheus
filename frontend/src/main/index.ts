// src/main/index.ts (or .tsx, but this is not React)

import { app, shell, BrowserWindow } from "electron";
import { join } from "path";
import { electronApp, optimizer, is } from "@electron-toolkit/utils";
import icon from "../../resources/icon.png?asset";
import { registerIPCHandlers } from "./ipc";

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === "linux" ? { icon } : {}),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, "../preload/index.js"), // put this back
      sandbox: false, // keep false for now while debugging
    },
  });

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  console.log("is.dev =", is.dev);
  console.log("ELECTRON_RENDERER_URL =", process.env["ELECTRON_RENDERER_URL"]);

  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    console.log("Loading DEV renderer URL");
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
    // FORCE DevTools open in dev:
    mainWindow.webContents.openDevTools({ mode: "detach" });
  } else {
    console.log("Loading BUILT renderer index.html");
    mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId("com.electron");

  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  registerIPCHandlers();
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
