import { create } from 'zustand';

type UserStore = {
    user: string | null;
    setUser: (user: string) => void; 
}

export const useUserStore = create<UserStore>((set) => ({
    user: localStorage.getItem('user-trello'),
    setUser: (user) => set(() => {
        localStorage.setItem('user-trello', user)
        return { user: user}
    })
}))