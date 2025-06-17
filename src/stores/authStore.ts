import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import useUserStore from './userStore';

type AuthStore = {
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
  logout: () => void;
};

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      setIsLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
      logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        useUserStore.getState().clearEmail();
        set({ isLoggedIn: false });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ isLoggedIn: state.isLoggedIn }),
    },
  ),
);

export default useAuthStore;
