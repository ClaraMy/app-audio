import { create } from "zustand";

const useCustomStore = create((set) => ({
    songs: [],
    setSongs: (_songs) => set((state) => ({ songs: _songs })),
}))

export default useCustomStore;