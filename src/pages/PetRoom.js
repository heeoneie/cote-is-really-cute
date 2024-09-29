import React, { Suspense } from 'react';
import { Rooms } from '../utils/Rooms';
import { Items } from '../utils/Items';
// import { AppContext } from '../App';
// eslint-disable-next-line import/no-unresolved
const Spline = React.lazy(() => import('@splinetool/react-spline'));

const PetRoom = () => {
  // const { userExp } = useContext(AppContext);
  const userExp = 800; //100단위로 레벨 증가하는 임시 변수(0~900)
  const level = Math.floor(userExp / 100) + 1;

  // 레벨에 따라 다른 Spline URL 반환
  const getScene = (level, type) => {
    if (type === 'item2') {
      return Items.item2[level - 4]; // 레벨 4, 5, 7
    } else if (type === 'item3') {
      return Items.item3[level - 6]; // 레벨 6
    }

    return Items[type][level - 1];
  };

  const renderItems = (level) => {
    if (level === 10) {
      return <p> 추후 업데이트 예정</p>;
    } else if (level === 6) {
      return (
        <>
          <Spline
            style={{ width: '80%', height: '180px' }}
            scene={getScene(level, 'item')}
          />
          <Spline
            style={{ width: '80%', height: '180px' }}
            scene={getScene(level, 'item2')}
          />
          <Spline
            style={{ width: '80%', height: '180px' }}
            scene={getScene(level, 'item3')}
          />
        </>
      );
    } else if ([4, 5, 7].includes(level)) {
      return (
        <>
          <Spline
            style={{ width: '80%', height: '180px' }}
            scene={getScene(level, 'item')}
          />
          <Spline
            style={{ width: '80%', height: '180px' }}
            scene={getScene(level, 'item2')}
          />
        </>
      );
    } else {
      return (
        <Spline
          style={{ width: '80%', height: '180px' }}
          scene={getScene(level, 'item')}
        />
      );
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        // width: 'calc(100vw - 290px)',
        height: '100vh',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <Spline
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            minWidth: '300px',
            minHeight: '300px',
          }}
          scene={Rooms[level - 1]}
        />
      </Suspense>
      <div
        style={{
          width: '250px',
          margin: '0',
          padding: '10px',
        }}
      >
        <div
          style={{
            height: 'auto',
            border: '5px solid #d9d9d9',
            borderRadius: '50px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            margin: '10px',
          }}
        >
          <p>다음 레벨 아이템</p>
          <p>Lv. {level + 1}</p>
          <Suspense fallback={<div>Loading...</div>}>
            {renderItems(level)}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default PetRoom;
