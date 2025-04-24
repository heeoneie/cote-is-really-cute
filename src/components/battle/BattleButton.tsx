'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import socket from '@utils/socket';
import useUserStore from '@stores/userStore';

interface MatchFoundData {
  matchId: string;
  problem: string;
}

const BattleButton = () => {
  const [isWaiting, setIsWaiting] = useState(false);
  const router = useRouter();
  const { email: userEmail } = useUserStore();

  useEffect(() => {
    const handleMatchFound = ({ matchId, problem }: MatchFoundData) => {
      setIsWaiting(false);
      router.push(`/battle/${matchId}?problem=${encodeURIComponent(problem)}`);
    };

    socket.on('matchFound', handleMatchFound);

    return () => {
      socket.off('matchFound', handleMatchFound);
    };
  }, [router]);

  const handleJoinBattle = () => {
    if (!userEmail) {
      console.error('유저 이메일을 찾을 수 없습니다.');
      return;
    }

    setIsWaiting(true);
    socket.emit('joinBattle', userEmail);
  };

  const handleCancelWaiting = () => {
    setIsWaiting(false);
    socket.emit('leaveBattle');
  };

  return (
    <div className="flex justify-center mt-4">
      {isWaiting ? (
        <div
          onClick={handleCancelWaiting}
          className="fixed inset-0 z-[1000] bg-black/20 flex flex-col items-center justify-center cursor-pointer"
        >
          <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin mb-4" />
          <h6 className="text-lg font-medium">매칭 대기 중...</h6>
          <p className="text-sm text-gray-600 mt-1">(클릭하면 취소됩니다)</p>
        </div>
      ) : (
        <button
          onClick={handleJoinBattle}
          className="w-[150px] py-2 px-4 border-4 border-gray-300 rounded-full bg-white text-black hover:bg-cyan-100 hover:border-cyan-400 transition-all"
        >
          대전 참가
        </button>
      )}
    </div>
  );
};

export default BattleButton;
