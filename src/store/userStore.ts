import { create } from 'zustand';

const EMAIL_KEY = 'email';

type UserStore = {
  email: string;
  setEmail: (email: string) => void;
  clearEmail: () => void;
};

const useUserStore = create<UserStore>((set) => ({
  email: localStorage.getItem(EMAIL_KEY) || '',
  setEmail: (email) => {
    localStorage.setItem(EMAIL_KEY, email);
    set({ email });
  },
  clearEmail: () => {
    localStorage.removeItem(EMAIL_KEY);
    set({ email: '' });
  },
}));

export default useUserStore;
