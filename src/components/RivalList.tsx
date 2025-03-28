import React from 'react';
import styled from '@emotion/styled/macro';
import { searchRival } from '@api/rival';
import RoomModal from './RoomModal';
import useUserStore from '@store/userStore';
import { User } from '../@types/user';
import { Rival } from '../@types/rival';

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
  const { email } = useUserStore();
  const [rivalList, setRivalList] = React.useState<Rival[]>([]);
  const [isModal, setIsModal] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    if (email) fetchRivalList(email);
  }, [email]);

  const fetchRivalList = async (email: string) => {
    try {
      const response = await searchRival(email);
      setRivalList(response.rivals);
    } catch (error) {
      console.error('Error fetching rivals', error);
      setRivalList([]);
    }
  };

  const openModal = (user: User) => {
    setSelectedUser(user);
    setIsModal(true);
  };

  const closeModal = () => {
    setIsModal(false);
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
        {rivalList.map((rival: Rival, index) => {
          return (
            <RivalLi key={index}>
              <p>{rival.nickName}</p>
              <PetButton onClick={() => openModal(rival)}>
                고양이방 보러가기
              </PetButton>
            </RivalLi>
          );
        })}
      </ul>
      <RoomModal
        show={isModal}
        onClose={closeModal}
        selectedUser={selectedUser}
      />
    </>
  );
};

export default RivalList;
