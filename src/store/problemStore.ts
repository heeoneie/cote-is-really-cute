import { create } from 'zustand';

type Problems = {
  beginner: string[];
  intermediate: string[];
  advanced: string[];
  [key: string]: string[];
};

type ProblemStore = {
  problems: Problems;
  setProblems: (problems: Problems) => void;
  currentProblemIndex: number;
  setCurrentProblemIndex: (index: number) => void;
  resetProblemIndex: () => void;
};

const useProblemStore = create<ProblemStore>((set) => ({
  problems: { beginner: [], intermediate: [], advanced: [] },
  setProblems: (problems) => {
    localStorage.setItem('problems', JSON.stringify(problems));
    set({ problems });
  },
  currentProblemIndex: 0,
  setCurrentProblemIndex: (index) => {
    localStorage.setItem('currentProblemIndex', JSON.stringify(index));
    set({ currentProblemIndex: index });
  },
  resetProblemIndex: () => {
    localStorage.removeItem('currentProblemIndex');
    set({ currentProblemIndex: 0 });
  },
}));

export default useProblemStore;
