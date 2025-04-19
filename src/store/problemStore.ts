import { create } from 'zustand';

type Problem = {
  title: string;
  problemNumber: number;
  url: string;
};

export type Problems = {
  beginner: Problem[];
  intermediate: Problem[];
  advanced: Problem[];
  [key: string]: Problem[];
};

type ProblemStore = {
  problems: Problems;
  setProblems: (problems: Problems) => void;
  currentProblemIndex: number;
  setCurrentProblemIndex: (index: number) => void;
  resetProblemIndex: () => void;
};

const useProblemStore = create<ProblemStore>((set) => ({
  problems: (() => {
    try {
      const storedProblems = localStorage.getItem('problems');
      return storedProblems
        ? JSON.parse(storedProblems)
        : { beginner: [], intermediate: [], advanced: [] };
    } catch (error) {
      console.error('Failed to load problems from localStorage:', error);
      return { beginner: [], intermediate: [], advanced: [] };
    }
  })(),
  setProblems: (problems) => {
    try {
      localStorage.setItem('problems', JSON.stringify(problems));
      set({ problems });
    } catch (error) {
      console.error('Failed to save problems to localStorage:', error);
      set({ problems });
    }
  },
  currentProblemIndex: (() => {
    try {
      const storedIndex = localStorage.getItem('currentProblemIndex');
      return storedIndex ? JSON.parse(storedIndex) : 0;
    } catch (error) {
      console.error(
        'Failed to load currentProblemIndex from localStorage:',
        error,
      );
      return 0;
    }
  })(),
  setCurrentProblemIndex: (index) => {
    try {
      localStorage.setItem('currentProblemIndex', JSON.stringify(index));
      set({ currentProblemIndex: index });
    } catch (error) {
      console.error(
        'Failed to save currentProblemIndex to localStorage:',
        error,
      );
      set({ currentProblemIndex: index });
    }
  },
  resetProblemIndex: () => {
    localStorage.removeItem('currentProblemIndex');
    set({ currentProblemIndex: 0 });
  },
}));

export default useProblemStore;
