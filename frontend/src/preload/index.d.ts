import { ElectronAPI } from '@electron-toolkit/preload'
import { PreloadAPI } from '@shared/types/ipc'

declare global {
  interface Window {
    electron: ElectronAPI
    api: PreloadAPI
  }
}
