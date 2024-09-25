import React, { Suspense } from 'react';
// import { AppContext } from '../App';
// eslint-disable-next-line import/no-unresolved
const Spline = React.lazy(() => import('@splinetool/react-spline'));

const PetRoom = () => {
  // const { userExp } = useContext(AppContext);
  const userExp = 900; //100단위로 레벨 증가하는 임시 변수(0~900)
  const level = Math.floor(userExp / 100) + 1;

  // 레벨에 따라 다른 Spline URL 반환
  const getScene = (level, type) => {
    const scenes = {
      room: [
        'https://prod.spline.design/pI2VvHNgRZPe6A2i/scene.splinecode', // 레벨 1
        'https://prod.spline.design/BbXVJz7rx7U5FvcP/scene.splinecode', // 레벨 2
        'https://prod.spline.design/tl3S3KKaSASoiAnl/scene.splinecode', // 레벨 3
        'https://prod.spline.design/ZbGcQW4Egdy1vF32/scene.splinecode', // 레벨 4
        'https://prod.spline.design/OOYWr7eSIZuTC2pH/scene.splinecode', // 레벨 5
        'https://prod.spline.design/LgYBGKgPm876x1Mz/scene.splinecode', // 레벨 6
        'https://prod.spline.design/b5nk095Y9y-0b2Qf/scene.splinecode', // 레벨 7
        'https://prod.spline.design/4Orf8deQ-7FG26gS/scene.splinecode', // 레벨 8
        'https://prod.spline.design/yKzbX49b1S2h6y7G/scene.splinecode', // 레벨 9
        'https://prod.spline.design/3v6zUfflC6F54KbR/scene.splinecode', // 레벨 10
      ],
      item: [
        'https://prod.spline.design/wd2lp0v8GDqU0Utg/scene.splinecode', // 레벨 1
        'https://prod.spline.design/R1QC1a2qPpz6j3VM/scene.splinecode', // 레벨 2
        'https://prod.spline.design/neyrs1rGnFWxMNm0/scene.splinecode', // 레벨 3
        'https://prod.spline.design/o0uC3cFqy6gxHCLi/scene.splinecode', // 레벨 4
        'https://prod.spline.design/0ZeNuRE3HMZU56h6/scene.splinecode', // 레벨 5
        'https://prod.spline.design/lo8Ai6NPpxczsUaC/scene.splinecode', // 레벨 6
        'https://prod.spline.design/NA-JF06M-2SiTYFS/scene.splinecode', // 레벨 7
        'https://prod.spline.design/aMJUE1t9YrSyq0mC/scene.splinecode', // 레벨 8
        'https://prod.spline.design/sGjMG9qAj4BxAEMo/scene.splinecode', // 레벨 9
      ],
      item2: [
        'https://prod.spline.design/AcefcXLqOVdY9Xew/scene.splinecode', // 레벨 4
        'https://prod.spline.design/xdmZoWJ2ryPdrB9x/scene.splinecode', // 레벨 5
        'https://prod.spline.design/dR0eGhUIl9llN72k/scene.splinecode', // 레벨 6
        'https://prod.spline.design/ea5aeBkj5qIQ184I/scene.splinecode', // 레벨 7
      ],
      item3: [
        'https://prod.spline.design/7OICwgVn4t8djpK7/scene.splinecode', // 레벨 6
      ],
    };

    if (type === 'item2') {
      return scenes.item2[level - 4]; // 레벨 4, 5, 7
    } else if (type === 'item3') {
      return scenes.item3[level - 6]; // 레벨 6
    }

    return scenes[type][level - 1];
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
          scene={getScene(level, 'room')}
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
