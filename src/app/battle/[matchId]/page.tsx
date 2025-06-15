'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CodeEditor from '@components/CodeEditor';
import Timer from '@components/Timer';
import socket from '@utils/socket';
import { gradeCode } from '@api/openai';
import toast from 'react-hot-toast';

interface Problem {
  problemNumber: number;
  problemTitle: string;
}

interface BattleEndData {
  problemId: number;
  winner: string;
  experience: number;
}

export default function BattlePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python');
  const [showEditor, setShowEditor] = useState(false);
  const [problem, setProblem] = useState<Problem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const problemParam = searchParams.get('problem');

  useEffect(() => {
    if (problemParam) {
      try {
        const parsed = JSON.parse(problemParam);
        setProblem(parsed);
      } catch (e) {
        console.error('문제 정보 파싱 오류:', e);
        toast.error('문제를 불러오는 중 오류가 발생했습니다.');
      }
    }
  }, [problemParam]);

  useEffect(() => {
    const handleBattleEnd = (data: BattleEndData) => {
      if (problem && data.problemId === problem.problemNumber) {
        alert(
          `배틀 종료! 승리자는 ${data.winner}입니다. 경험치 ${data.experience}를 얻었습니다.`,
        );
        router.push('/');
      }
    };

    socket.on('battleEnded', handleBattleEnd);
    return () => {
      socket.off('battleEnded', handleBattleEnd);
    };
  }, [problem, router]);

  const handleCodeSubmit = useCallback(async () => {
    if (!problem) return;
    setIsSubmitting(true);
    try {
      const result = await gradeCode({
        problemTitle: problem.problemTitle,
        userLanguage: language,
        userCode: code,
      });

      if (result) {
        toast.success('정답입니다!');
        socket.emit('submitSolution', {
          problemNumber: problem.problemNumber,
          userEmail: localStorage.getItem('email'),
          isCorrect: true,
        });
      } else {
        toast.error('틀렸습니다. 다시 시도해보세요.');
      }
    } catch (error) {
      console.error('채점 오류:', error);
      toast.error('채점 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  }, [problem, language, code]);

  const handleSolve = () => {
    if (problem) {
      window.open(
        `https://www.acmicpc.net/problem/${problem.problemNumber}`,
        '_blank',
      );
      setShowEditor(true);
    }
  };

  if (!problem) {
    return (
      <div className="flex items-center justify-center h-screen text-lg">
        문제를 불러오는 중입니다...
      </div>
    );
  }

  return (
    <div className="flex w-full h-[90vh]">
      <div className="flex flex-col items-center justify-center flex-1 h-full">
        <div className="flex flex-col items-center justify-center h-[90%] w-[90%]">
          {!showEditor ? (
            <>
              <h4 className="text-2xl m-4">
                문제번호 : {problem.problemNumber}
              </h4>
              <h4 className="text-2xl m-4">{problem.problemTitle}</h4>
              <button
                onClick={handleSolve}
                className="w-[150px] py-2 px-4 border-4 border-gray-300 rounded-full bg-white text-black hover:bg-[#61ecff78] hover:border-[#61ecff] transition"
              >
                문제 풀기
              </button>
            </>
          ) : (
            <div className="w-full h-full flex">
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

      <div className="w-[290px] min-w-[290px] border-l-4 border-gray-300 flex flex-col items-center justify-center h-full">
        {showEditor && (
          <>
            <h4 className="text-2xl m-2">{problem.problemNumber}</h4>
            <h4 className="text-2xl m-2">{problem.problemTitle}</h4>
          </>
        )}
        <Timer
          initialMinutes={30}
          onTimerEnd={() => {
            alert('시간이 종료되었습니다!');
            handleCodeSubmit();
          }}
        />
      </div>
    </div>
  );
}
