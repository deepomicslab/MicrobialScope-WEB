import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export const useDetailPageTutorialStore = create(
    persist(
        (set) => ({
            hasSeenTutorial: false,
            setHasSeenTutorial: () => set({ hasSeenTutorial: true }),
        }),
        {
            name: 'tutorial-state',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
)
