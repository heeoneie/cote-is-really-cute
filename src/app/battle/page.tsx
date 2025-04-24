'use client';

import React, { useState } from 'react';
import Spline from '@splinetool/react-spline';
import BattleBtn from '@components/BattleBtn';
import Timer from '@components/Timer';

const BattlePage = () => {
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [splineError, setSplineError] = useState(false);

  return (
    <div className="flex flex-col md:flex-row w-full h-[90vh]">
      {/* Main Section */}
      <div className="flex flex-col items-center justify-center flex-1 px-4 text-center">
        <h5 className="text-2xl md:text-3xl font-semibold mb-4">
          코딩 능력을 시험해볼 기회!
          <br />
          다른 유저와의 대결에서 승리하고 경험치를 쌓아보세요!
        </h5>

        <div className="w-full h-[70%] flex justify-center items-center relative">
          {!splineLoaded && !splineError && (
            <div className="w-4/5 h-full bg-gray-200 animate-pulse rounded" />
          )}
          {splineError && (
            <div className="text-red-500">3D 콘텐츠를 불러올 수 없습니다.</div>
          )}
          <div className={`${splineLoaded ? 'block' : 'hidden'} w-full h-full`}>
            <Spline
              scene="https://prod.spline.design/HMPTMU1jPmnbwett/scene.splinecode"
              onLoad={() => setSplineLoaded(true)}
              onError={() => setSplineError(true)}
              style={{ height: '100%' }}
            />
          </div>
        </div>

        <BattleBtn />
      </div>

      <div className="w-full md:w-[290px] flex justify-center items-center border-t md:border-t-0 md:border-l border-black/15">
        <div className="w-full md:w-[290px] flex flex-col items-center justify-center h-full px-4">
          <Timer initialMinutes={30} />
        </div>
      </div>
    </div>
  );
};

export default BattlePage;
