import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface BearState {
  bears: number
  increase: (by: number) => void
}

const useStore = create<BearState>()(
  persist(
    (set) => ({
      bears: 0,
      increase: (by: number) => set((state: BearState) => ({ bears: state.bears + by })),
    }),
    {
      name: 'auth-storage',
    }
  )
)

export default useStore