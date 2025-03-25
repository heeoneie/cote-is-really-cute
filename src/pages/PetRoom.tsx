import React, { Suspense, useEffect, useState, useMemo } from 'react';
import styled from '@emotion/styled';
import { rooms } from '@utils/rooms';
import SplineScene from '@components/SplineScene';
import { searchRival } from '@api/rival';
import useUserStore from '@store/userStore';

const Spline = React.lazy(() => import('@splinetool/react-spline'));

const PetRoomContainer = styled.div`
  display: flex;
  width: calc(100vw - 290px);
  height: 90vh;
  overflow: hidden;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-left: 290px;
`;

const SplineWrapper = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 300px;
`;

const SidePanel = styled.div`
  width: 250px;
  padding: 10px;
`;

const LevelBox = styled.div`
  border: 5px solid #d9d9d9;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 10px;
  padding: 10px;
`;

const PetRoom: React.FC = () => {
  const { email } = useUserStore();
  const [level, setLevel] = useState<number>(1);

  useEffect(() => {
    const fetchLevel = async () => {
      if (!email) return;
      try {
        const response = await searchRival(email);
        setLevel(response.rivals[0].rating);
      } catch (error) {
        console.error('Error fetching rivals', error);
        setLevel(1);
      }
    };
    fetchLevel();
  }, [email]);

  const renderItems = useMemo(() => {
    if (level === 10) {
      return <p>추후 업데이트 예정</p>;
    }
    const items = [
      <SplineScene key="item1" level={level} type="item" />,
      (level === 6 || [4, 5, 7].includes(level)) && (
        <SplineScene key="item2" level={level} type="item2" />
      ),
      level === 6 && <SplineScene key="item3" level={level} type="item3" />,
    ];
    return items.filter(Boolean);
  }, [level]);

  return (
    <PetRoomContainer>
      <Suspense fallback={<div>Loading...</div>}>
        <SplineWrapper>
          <Spline scene={rooms[level - 1]} />
        </SplineWrapper>
      </Suspense>
      <SidePanel>
        <LevelBox>
          <p>다음 레벨 아이템</p>
          <p>Lv. {level + 1}</p>
          {renderItems}
        </LevelBox>
      </SidePanel>
    </PetRoomContainer>
  );
};

export default PetRoom;
