'use client';

import { create } from 'zustand';
import { useEffect } from 'react';

const EMAIL_KEY = 'email';

type UserStore = {
  email: string;
  setEmail: (email: string) => void;
  clearEmail: () => void;
};

const useUserStore = create<UserStore>((set) => ({
  email: '',
  setEmail: (email) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(EMAIL_KEY, email);
    }
    set({ email });
  },
  clearEmail: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(EMAIL_KEY);
    }
    set({ email: '' });
  },
}));

export const InitUserStore = () => {
  const setEmail = useUserStore((s) => s.setEmail);

  useEffect(() => {
    const email = localStorage.getItem(EMAIL_KEY);
    if (email) setEmail(email);
  }, [setEmail]);

  return null;
};

export default useUserStore;
