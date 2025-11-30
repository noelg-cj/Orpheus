import { create } from 'zustand';

type UIState = {
    isCommandBarOpen: boolean;
    setCommandBarOpen: (isOpen: boolean) => void;
    toggleCommandBar: () => void;
}

export const useUIStore = create<UIState>((set) => ({
    isCommandBarOpen: false,
    setCommandBarOpen: (open) => set({ isCommandBarOpen: open }),
    toggleCommandBar: () => set((state) => ({ isCommandBarOpen: !state.isCommandBarOpen })),
}));