import { create } from 'zustand';

type UserStore = {
  email: string;
  setEmail: (email: string) => void;
};

const useUserStore = create<UserStore>((set) => ({
  email: '',
  setEmail: (email) => set({ email }),
}));

export default useUserStore;
