import type { PreloadAPI } from "@shared/types/ipc";

declare global {
  interface Window {
    api: PreloadAPI;
  }
}

export {};
