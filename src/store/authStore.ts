import { create } from 'zustand';

const TOKEN_KEY = 'token';
const EMAIL = 'email';

const getTokenFromStorage = (): string | null => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('localStorage 접근 오류:', error);
    return null;
  }
};

type AuthStore = {
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
  logout: () => void;
};

const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: !!getTokenFromStorage(),
  setIsLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
  logout: () => {
    try {
      localStorage.removeItem(EMAIL);
      localStorage.removeItem(TOKEN_KEY);
      set({ isLoggedIn: false });
    } catch (error) {
      console.error('로그아웃 중 오류:', error);
    }
  },
}));

export default useAuthStore;
