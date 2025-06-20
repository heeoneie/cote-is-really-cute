'use client';

import { useEffect, useState, useMemo, Suspense } from 'react';
import { rooms } from '@utils/rooms';
import SplineScene from '@components/SplineScene';
import dynamic from 'next/dynamic';
import { getUserLevel } from '@api/user';
import useUserStore from '@stores/userStore';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

export default function PetRoom() {
  const { email } = useUserStore();
  const [level, setLevel] = useState<number | null>(null);

  useEffect(() => {
    const fetchLevel = async () => {
      if (!email) return;
      try {
        const userLevel = await getUserLevel(email);
        setLevel(userLevel ?? 1);
      } catch (err) {
        console.error('레벨 불러오기 실패:', err);
        setLevel(1);
      }
    };
    fetchLevel();
  }, [email]);

  const renderItems = useMemo(() => {
    if (level === null || level === 10) return <p>추후 업데이트 예정</p>;

    return [
      <SplineScene key="item1" level={level} type="item" />,
      (level === 6 || [4, 5, 7].includes(level)) && (
        <SplineScene key="item2" level={level} type="item2" />
      ),
      level === 6 && <SplineScene key="item3" level={level} type="item3" />,
    ].filter(Boolean);
  }, [level]);

  if (level === null) {
    return <div className="text-center mt-10">레벨 정보를 불러오는 중...</div>;
  }

  return (
    <div className="flex h-full w-full overflow-hidden flex-row items-center justify-between">
      <div className="flex-1 w-full h-full min-w-[300px] min-h-[300px]">
        <Suspense fallback={<div>Loading...</div>}>
          <Spline scene={rooms[level - 1]} />
        </Suspense>
      </div>
      <div className="w-[250px] p-2">
        <div className="border-[5px] border-gray-300 rounded-[50px] flex flex-col items-center text-center m-2 p-2">
          <p>다음 레벨 아이템</p>
          <p>Lv. {level + 1}</p>
          {renderItems}
        </div>
      </div>
    </div>
  );
}
