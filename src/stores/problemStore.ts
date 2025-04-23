'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

// 🧠 SSR 환경에선 store 생성 X
const useProblemStore =
  typeof window !== 'undefined'
    ? create<ProblemStore>()(
        persist(
          (set) => ({
            problems: {
              beginner: [],
              intermediate: [],
              advanced: [],
            },
            setProblems: (problems) => set({ problems }),
            currentProblemIndex: 0,
            setCurrentProblemIndex: (index) =>
              set({ currentProblemIndex: index }),
            resetProblemIndex: () => set({ currentProblemIndex: 0 }),
          }),
          {
            name: 'problem-storage',
            partialize: (state) => ({
              problems: state.problems,
              currentProblemIndex: state.currentProblemIndex,
            }),
          },
        ),
      )
    : () =>
        ({
          problems: {
            beginner: [],
            intermediate: [],
            advanced: [],
          },
          setProblems: () => {},
          currentProblemIndex: 0,
          setCurrentProblemIndex: () => {},
          resetProblemIndex: () => {},
        }) as ProblemStore;

export default useProblemStore;
