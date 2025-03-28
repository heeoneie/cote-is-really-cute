import React, { useState } from 'react';
import '../styles/SearchBar.css';
import { searchUser } from '@api/user';
import { addRival, deleteRival } from '@api/rival';
import RoomModal from './RoomModal';
import { User } from '../@types/user';

const SearchBar: React.FC = () => {
  const [nickName, setNickName] = useState<string>('');
  const [userList, setUserList] = useState<User[]>([]);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const email = localStorage.getItem('email') ?? '';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setNickName(input);

    if (!input.trim()) {
      setUserList([]);
      setIsShow(false);
    }
  };

  const searchName = async (input: string) => {
    if (!email) return;
    try {
      const response: User[] = await searchUser(input, email);
      setUserList(response);
      setIsShow(userList.length > 0);
    } catch (error) {
      console.error('Error', error);
      setUserList([]);
      setIsShow(false);
    }
  };

  const handleAddRival = async (user: string) => {
    const data = { userEmail: email, rivalNickName: user };
    try {
      const response = await addRival(data);
      if (response) {
        alert(response.message);
        await searchName(nickName);
      }
    } catch (error) {
      console.error('라이벌 추가 실패:', error);
    }
  };

  const handleDeleteRival = async (user: string) => {
    try {
      const response = await deleteRival(email, user);
      if (response) {
        alert(response.message);
        await searchName(nickName);
      }
    } catch (error) {
      console.error('라이벌 삭제 실패:', error);
    }
  };

  const openModal = (user: User) => {
    setSelectedUser(user);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="유저검색"
        className="search-bar"
        id="searchInput"
        value={nickName}
        onChange={handleInputChange}
      />
      <button className="search-btn">
        <img src="/img/searchbar.png" alt="검색" className="search-icon" />
      </button>

      {isShow && (
        <ul className="dropdown">
          {userList.map((user) => (
            <li key={user.nickName} className="dropdown-item">
              {user.nickName}

              {user.isRival ? (
                <button
                  className="rival-btn"
                  onClick={() => handleDeleteRival(user.nickName)}
                >
                  라이벌 끊기
                </button>
              ) : (
                <button
                  className="rival-btn"
                  onClick={() => handleAddRival(user.nickName)}
                >
                  라이벌 맺기
                </button>
              )}

              <button className="room-btn" onClick={() => openModal(user)}>
                고양이방 보기
              </button>
            </li>
          ))}
        </ul>
      )}

      <RoomModal
        show={modal}
        onClose={closeModal}
        selectedUser={selectedUser}
      />
    </div>
  );
};

export default SearchBar;
