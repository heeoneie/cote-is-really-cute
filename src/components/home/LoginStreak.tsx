import React, { useEffect, useState } from 'react';
import { checkConsecutiveAttendance } from '@api/user';
import useUserStore from '@stores/userStore';

const LoginStreak = () => {
  const { email } = useUserStore();
  const [consecutiveDays, setConsecutiveDays] = useState<number>(0);

  const fetchConsecutiveAttendance = async (userEmail: string) => {
    try {
      const days: number | null = await checkConsecutiveAttendance(userEmail);
      setConsecutiveDays(days ?? 0);
      localStorage.setItem('consecutiveDays', String(days ?? 0));
    } catch (error) {
      console.error('Error fetching attendance:', error);
    }
  };

  useEffect(() => {
    if (email) fetchConsecutiveAttendance(email);
  }, [email]);

  return (
    <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 border border-gray-300 rounded-xl p-4 w-64 h-32 overflow-hidden">
      <p className="text-xl font-bold text-orange-500 animate-slideUp">
        Excellent!
      </p>
      <img
        src="/fire.png"
        alt="연속 출석 불꽃 아이콘"
        className="w-12 animate-float"
      />
      <h2 className="text-lg font-light mt-2 text-center text-gray-900 dark:text-white">
        {consecutiveDays}일 연속 공부 중!
      </h2>
    </div>
  );
};

export default LoginStreak;
