import React, { Suspense, useContext } from 'react';
import { rooms } from '../utils/rooms';
import SplineScene from '../components/SplineScene';
import { searchRival } from '../api/rival';
import { AppContext } from '../App';
// eslint-disable-next-line import/no-unresolved
const Spline = React.lazy(() => import('@splinetool/react-spline'));

const PetRoom = () => {
  const { email } = useContext(AppContext);
  const [level, setLevel] = React.useState(1);

  React.useEffect(() => {
    if (email) fetchLevel(email);
  }, [email]);

  const fetchLevel = async (email) => {
    try {
      const response = await searchRival(email);
      setLevel(response.userLevel);
    } catch (error) {
      console.error('Error fetching rivals', error);
      setLevel(1);
    }
  };

  const renderItems = (level) => {
    if (level === 10) {
      return <p> 추후 업데이트 예정</p>;
    } else if (level === 6) {
      return (
        <>
          <SplineScene level={level} type="item" />
          <SplineScene level={level} type="item2" />
          <SplineScene level={level} type="item3" />
        </>
      );
    } else if ([4, 5, 7].includes(level)) {
      return (
        <>
          <SplineScene level={level} type="item" />
          <SplineScene level={level} type="item2" />
        </>
      );
    } else {
      return <SplineScene level={level} type="item" />;
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        width: 'calc(100vw - 290px)',
        height: '90vh',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: '290px',
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
          scene={rooms[level - 1]}
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
          {renderItems(level)}
        </div>
      </div>
    </div>
  );
};

export default PetRoom;
