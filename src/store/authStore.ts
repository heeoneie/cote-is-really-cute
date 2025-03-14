import { create } from 'zustand';

type AuthStore = {
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
};

const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: !!localStorage.getItem('token'),
  setIsLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
}));

export default useAuthStore;
