import { create } from 'zustand';

type Problems = {
  beginner: string[];
  intermediate: string[];
  advanced: string[];
};

type ProblemStore = {
  problems: Problems;
  setProblems: (problems: Problems) => void;
  currentProblemIndex: number;
  setCurrentProblemIndex: (index: number) => void;
};

const useProblemStore = create<ProblemStore>((set) => ({
  problems: (() => {
    const storedProblems = localStorage.getItem('problems');
    return storedProblems
      ? JSON.parse(storedProblems)
      : { beginner: [], intermediate: [], advanced: [] };
  })(),
  setProblems: (problems) => set({ problems }),
  currentProblemIndex: (() => {
    const storedIndex = localStorage.getItem('currentProblemIndex');
    return storedIndex ? JSON.parse(storedIndex) : 0;
  })(),
  setCurrentProblemIndex: (index) => set({ currentProblemIndex: index }),
}));

export default useProblemStore;
