import React, { Suspense } from 'react';
import { items } from '@utils/items';

const Spline = React.lazy(() => import('@splinetool/react-spline'));

const SplineScene = ({ level, type }) => {
  const getScene = (level, type) => {
    if (type === 'item2') {
      return items.item2[level - 4];
    } else if (type === 'item3') {
      return items.item3[level - 6];
    }
    return items[type][level - 1];
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
