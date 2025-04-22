import { create } from 'zustand';

const EMAIL_KEY = 'email';

type UserStore = {
  email: string;
  setEmail: (email: string) => void;
  clearEmail: () => void;
};

const useUserStore = create<UserStore>((set) => ({
  email: (() => {
    try {
      return localStorage.getItem(EMAIL_KEY) || '';
    } catch (error) {
      console.error('localStorage 접근 오류:', error);
      return '';
    }
  })(),
  setEmail: (email) => {
    try {
      localStorage.setItem(EMAIL_KEY, email);
      set({ email });
    } catch (error) {
      console.error('이메일 저장 중 오류:', error);
      set({ email });
    }
  },
  clearEmail: () => {
    try {
      localStorage.removeItem(EMAIL_KEY);
      set({ email: '' });
    } catch (error) {
      console.error('이메일 삭제 중 오류:', error);
      set({ email: '' });
    }
  },
}));

export default useUserStore;
