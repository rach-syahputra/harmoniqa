import { create } from 'zustand'

interface PlayerStore {
  ids: string[]
  activeId?: string
  setActiveId: (id: string) => void
  setIds: (ids: string[]) => void
  reset: () => void
}

const usePlayer = create<PlayerStore>((set) => ({
  ids: [],
  activeId: undefined,
  setIds: (ids: string[]) => set({ ids: ids }),
  setActiveId: (id: string) => set({ activeId: id }),
  reset: () => set({ ids: [], activeId: undefined })
}))

export default usePlayer
