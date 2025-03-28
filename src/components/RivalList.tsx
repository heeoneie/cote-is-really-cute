import React, { useContext } from 'react';
import styled from '@emotion/styled/macro';
import { AppContext } from '../App';
import { searchRival } from '../api/rival';
import RoomModal from './RoomModal';

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
  const { email } = useContext(AppContext);
  const [rivalList, setRivalList] = React.useState([]);
  const [modal, setModal] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);

  React.useEffect(() => {
    if (email) fetchRivalList(email);
  }, [email]);

  const fetchRivalList = async (email) => {
    try {
      const response = await searchRival(email);
      setRivalList(response.rivals);
    } catch (error) {
      console.error('Error fetching rivals', error);
      setRivalList([]);
    }
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    setSelectedUser(null);
  };

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
              <PetButton onClick={() => openModal(data)}>
                고양이방 보러가기
              </PetButton>
            </RivalLi>
          );
        })}
      </ul>
      <RoomModal
        show={modal}
        onClose={closeModal}
        selectedUser={selectedUser}
      />
    </>
  );
};

export default RivalList;
