'use client';

import { create } from 'zustand';
import useUserStore from './userStore';

const TOKEN_KEY = 'token';
const EMAIL = 'email';

const isClient = typeof window !== 'undefined';

const getTokenFromStorage = (): string | null => {
  if (!isClient) return null;
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
    if (!isClient) return;

    try {
      localStorage.removeItem(EMAIL);
      localStorage.removeItem(TOKEN_KEY);
      useUserStore.getState().clearEmail();
      set({ isLoggedIn: false });
    } catch (error) {
      console.error('로그아웃 중 오류:', error);
    }
  },
}));

export default useAuthStore;
