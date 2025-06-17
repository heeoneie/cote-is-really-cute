import React, { lazy, Suspense } from 'react';
import { items } from '@utils/items';

interface Items {
  item: string[];
  item2: string[];
  item3: string[];
}
interface SplineSceneProps {
  level: number;
  type: keyof Items;
}

const Spline = lazy(() => import('@splinetool/react-spline'));

const SplineScene: React.FC<SplineSceneProps> = ({ level, type }) => {
  const getScene = (level: number, type: keyof Items): string => {
    try {
      if (level <= 0) {
        console.error('레벨은 0보다 커야 합니다');
        return '';
      }
      const idx =
        type === 'item2' ? level - 4 : type === 'item3' ? level - 6 : level - 1;
      const scene = items[type][idx];
      if (!scene) {
        console.warn(
          `레벨(${level})과 타입(${type})에 해당하는 씬이 없습니다.`,
        );
        return '';
      }
      return scene;
    } catch (error) {
      console.error('장면을 가져오는 중 오류 발생:', error);
      return '';
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Spline
        style={{ width: '80%', height: '180px' }}
        scene={getScene(level, type)}
      />
    </Suspense>
  );
};

export default SplineScene;
