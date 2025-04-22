'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CATEGORIES, DifficultyLevels } from '@utils/categories';
import { getAlgorithmCourse } from '@api/openai';
import useProblemStore from '@stores/problemStore';
import parseProblems from '@utils/parseProblems';
import DifficultyButton from './DifficultyBtn';
import AlgorithmButton from './AlgorithmBtn';
import LoadingOverlay from './LoadingOverlay';

const CategoryBtn = () => {
  const router = useRouter();
  const { setProblems } = useProblemStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    keyof typeof CATEGORIES | null
  >(null);

  const handleDifficultyClick = (difficulty: '초급' | '중급' | '고급') => {
    setSelectedDifficulty(difficulty);
  };

  const getCourse = async (category: string) => {
    setLoading(true);
    setError('');
    try {
      const response = await getAlgorithmCourse(category);
      const parsed = parseProblems(response);
      setProblems(parsed);
      router.push(`/algo-practice/${category}/beginner/0`);
    } catch (err) {
      setError('문제를 불러오지 못했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      {loading && <LoadingOverlay />}
      <div
        onClick={() => setSelectedDifficulty(null)}
        className="w-full flex flex-col items-center p-4"
      >
        {!selectedDifficulty ? (
          <div className="grid gap-6">
            {Object.keys(CATEGORIES).map((difficulty) => (
              <DifficultyButton
                key={difficulty}
                difficulty={difficulty}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDifficultyClick(difficulty as DifficultyLevels);
                }}
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 mt-6">
            {CATEGORIES[selectedDifficulty].map((algorithm) => (
              <AlgorithmButton
                key={algorithm}
                label={algorithm}
                onClick={(e) => {
                  e.stopPropagation();
                  getCourse(algorithm);
                }}
              />
            ))}
          </div>
        )}
        {error && (
          <p className="mt-4 text-sm text-red-600 bg-red-100 px-3 py-2 rounded-md">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoryBtn;
