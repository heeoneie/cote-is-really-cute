import { create } from 'zustand';

type Problem = {
  title: string;
  problemNumber: number;
  url: string;
};

type Problems = {
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
    localStorage.setItem('problems', JSON.stringify(problems));
    set({ problems });
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
    localStorage.setItem('currentProblemIndex', JSON.stringify(index));
    set({ currentProblemIndex: index });
  },
  resetProblemIndex: () => {
    localStorage.removeItem('currentProblemIndex');
    set({ currentProblemIndex: 0 });
  },
}));

export default useProblemStore;
