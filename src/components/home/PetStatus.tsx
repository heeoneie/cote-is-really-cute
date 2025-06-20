import React, { useEffect, useState } from 'react';
import { searchRival } from '@api/rival'; // Rival 검색 API
import Spline from '@splinetool/react-spline';
import useUserStore from '@stores/userStore';

const PetStatus = () => {
  const { email } = useUserStore();
  const [level, setLevel] = useState<number>(1);

  useEffect(() => {
    const fetchLevel = async () => {
      try {
        const response = await searchRival(email);
        if (response.rivals && response.rivals.length > 0) {
          setLevel(response.rivals[0].level.level);
        }
      } catch (error) {
        console.error('Error fetching rivals', error);
        setLevel(1);
      }
    };

    if (email) {
      fetchLevel();
    }
  }, [email]);

  return (
    <div className="w-64 bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-300">
      <h2 className="text-center text-lg font-semibold text-gray-900 dark:text-white">
        고양이 상태창
      </h2>
      <div className="w-full h-56 my-4">
        <Spline scene="https://prod.spline.design/QxlBuwJ2HLEZYiRN/scene.splinecode" />
      </div>
      <p className="text-center text-gray-700 dark:text-gray-300">
        현재 레벨: <span className="font-bold text-xl">Lv. {level}</span>
      </p>
    </div>
  );
};

export default PetStatus;
