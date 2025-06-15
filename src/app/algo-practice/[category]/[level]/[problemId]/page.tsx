'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CodeEditor from '@components/CodeEditor';
import Timer from '@components/Timer';
import { gradeCode } from '@api/openai';
import useProblemStore from '@stores/problemStore';

type ParamsType = {
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  problemId: string;
};

interface Props {
  params: Promise<ParamsType>;
}

export default function ProblemSolvingPage({ params }: Props) {
  const { category, level } = use(params);
  const router = useRouter();
  const { problems, currentProblemIndex, setCurrentProblemIndex } =
    useProblemStore();

  const [showAlert, setShowAlert] = useState(false);
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python');
  const [isGrading, setIsGrading] = useState(false);

  const levelSequence = ['beginner', 'intermediate', 'advanced'];
  const currentLevelIndex = levelSequence.indexOf(level);
  const currentProblems = problems[level] || [];

  useEffect(() => {
    setCurrentProblemIndex(0);
  }, [level, category]);

  const nextProblem = () => {
    const nextIndex = currentProblemIndex + 1;

    if (nextIndex < currentProblems.length) {
      setCurrentProblemIndex(nextIndex);
    } else {
      const nextLevelIndex = currentLevelIndex + 1;
      if (nextLevelIndex < levelSequence.length) {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          router.push(
            `/algo-practice/${category}/${levelSequence[nextLevelIndex]}`,
          );
          setCurrentProblemIndex(0);
        }, 2000);
      } else {
        alert('모든 문제를 풀었습니다! 축하합니다!');
        router.push('/');
      }
    }

    setCode('');
    setIsGrading(false);
  };

  const handleProblemSolving = () => {
    window.open(currentProblems[currentProblemIndex]?.url, '_blank');
    setShowCodeEditor(true);
  };

  const handleCodeSubmit = async () => {
    try {
      const result = await gradeCode({
        problemTitle: currentProblems[currentProblemIndex]?.title,
        userLanguage: language,
        userCode: code,
      });

      setIsGrading(result);

      if (result) {
        alert('정답입니다!');
        return true;
      } else {
        alert('틀렸습니다. 다시 시도해보세요.');
        return false;
      }
    } catch (error) {
      console.error('채점 중 오류가 발생했습니다:', error);
      alert('채점 중 오류가 발생했습니다.');
      return false;
    }
  };

  return (
    <div className="w-full p-6 flex flex-col items-center">
      {showAlert && (
        <div className="w-full mb-4 rounded-md bg-green-100 text-green-700 px-4 py-2 text-center">
          다음 단계로 넘어갑니다!
        </div>
      )}

      <div
        className={`flex w-full ${showCodeEditor ? 'flex-row' : 'flex-col'} gap-6`}
      >
        <div
          className={`flex flex-col items-center justify-center w-full md:max-w-xs p-4 border rounded-lg ${
            showCodeEditor ? 'border-l-4 border-black/20' : ''
          }`}
        >
          {currentProblems[currentProblemIndex] ? (
            <>
              <h2 className="text-lg font-semibold mb-2">
                문제번호: {currentProblems[currentProblemIndex].problemNumber}
              </h2>
              <h3 className="text-xl font-bold mb-4">
                {currentProblems[currentProblemIndex].title}
              </h3>
              <Timer initialMinutes={30} />

              <button
                onClick={handleProblemSolving}
                className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
              >
                문제 풀기
              </button>
              <button
                onClick={nextProblem}
                disabled={!isGrading}
                className={`w-full mt-2 py-2 rounded transition ${
                  isGrading
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                다음 문제
              </button>
            </>
          ) : (
            <p className="text-gray-600">문제가 없습니다.</p>
          )}
        </div>

        {showCodeEditor && (
          <div className="flex-1 min-w-0">
            <CodeEditor
              code={code}
              onChange={setCode}
              onLanguageChange={setLanguage}
              onSubmit={handleCodeSubmit}
            />
          </div>
        )}
      </div>
    </div>
  );
}
