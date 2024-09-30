import React from 'react';
import styled from '@emotion/styled/macro';

const PetButton = styled.button`
  background-color: white;
  border: 3px solid #f28434;
  border-radius: 50px;
  margin-left: 8px;
  cursor: pointer;

  &:hover {
    background-color: #f2833470;
  }
`;

const RivalLi = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  flex-wrap: wrap;
`;
const RivalList = () => {
  const [rivalList, setRivalList] = React.useState([]);

  React.useEffect(() => {
    setRivalList([{ nickName: 'wldusdn' }, { nickName: 'wavetoearth' }]);
  }, []);
  return (
    <>
      <h1
        style={{
          fontSize: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src="/img/rival.png"
          alt="라이벌"
          style={{ width: '40px', marginRight: '8px' }}
        />
        라이벌 목록
      </h1>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {rivalList.map((data, index) => {
          return (
            <RivalLi key={index}>
              <p>{data.nickName}</p>
              <PetButton>고양이방 보러가기</PetButton>
            </RivalLi>
          );
        })}
      </ul>
    </>
  );
};

export default RivalList;
