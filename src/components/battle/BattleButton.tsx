'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import socket from '@utils/socket';
import useUserStore from '@stores/userStore';
import toast from 'react-hot-toast';

interface MatchFoundData {
  matchId: string;
  problem: string;
}

const BattleButton = () => {
  const [isWaiting, setIsWaiting] = useState(false);
  const router = useRouter();
  const { email: userEmail } = useUserStore();

  useEffect(() => {
    if (!socket.connected) socket.connect();

    const handleConnectError = (error: unknown) => {
      console.error('소켓 연결 오류:', error);
      alert('서버 연결에 실패했습니다. 잠시 후 다시 시도해주세요.');
    };

    const handleMatchFound = ({ matchId, problem }: MatchFoundData) => {
      setIsWaiting(false);
      console.log('🔥 matchFound 수신:', { matchId, problem });
      router.push(`/battle/${matchId}`);
    };

    socket.on('matchFound', handleMatchFound);
    socket.on('connect_error', handleConnectError);

    return () => {
      socket.off('matchFound', handleMatchFound);
      socket.off('connect_error', handleConnectError);
    };
  }, [router]);

  const handleJoinBattle = () => {
    if (!userEmail) {
      console.error('유저 이메일을 찾을 수 없습니다.');
      toast.error('유저 이메일을 찾을 수 없습니다.');
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
          onKeyDown={(e) => e.key === 'Escape' && handleCancelWaiting()}
          tabIndex={0}
          role="button"
          aria-label="매칭 취소"
          className="fixed inset-0 z-[1000] bg-black/20 flex flex-col items-center justify-center cursor-pointer"
        >
          <div
            role="progressbar"
            aria-valuetext="매칭 대기 중"
            className="w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin mb-4"
          />
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
