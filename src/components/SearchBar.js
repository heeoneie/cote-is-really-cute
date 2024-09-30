import React from 'react';
import '../styles/SearchBar.css';
import { searchUser } from '../axios/user';
import { addRival, deleteRival } from '../axios/rival';
import RoomModal from './RoomModal';

const SearchBar = () => {
  const [nickNm, setNickNm] = React.useState('');
  const [dataList, setDataList] = React.useState([]);
  const [show, setShow] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const email = localStorage.getItem('email');

  const handleInputChange = (e) => {
    const input = e.target.value;
    setNickNm(input);

    if (input.trim()) {
      searchNm(input);
    } else {
      setDataList([]);
      setShow(false);
    }
  };

  const searchNm = async (input) => {
    try {
      const userList = await searchUser(input, email);
      setDataList(userList);
      setShow(userList.length > 0);
    } catch (error) {
      console.error('Error', error);
      setDataList([]);
      setShow(false);
    }
  };

  const handleAddRival = async (user) => {
    const data = {
      userEmail: email,
      rivalNickName: user,
    };
    const response = await addRival(data);
    if (response) {
      alert(response.message);
      searchNm(nickNm);
    }
  };

  const handleDeleteRival = async (user) => {
    const response = await deleteRival(email, user);
    if (response) {
      alert(response.message);
      searchNm(nickNm);
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
    <div className="search-container">
      <input
        type="text"
        placeholder="유저검색"
        className="search-bar"
        id="searchInput"
        value={nickNm}
        onChange={handleInputChange}
      />
      <button className="search-btn">
        <img src="/img/searchbar.png" alt="검색" className="search-icon" />
      </button>

      {show && (
        <ul className="dropdown">
          {dataList.map((data, index) => {
            return (
              <li key={index} className="dropdown-item">
                {data.nickName}
                <p className="tier">- 백준 티어: {data.baekjoonTier}</p>

                {data.isRival ? (
                  <button
                    className="rival-btn"
                    onClick={() => handleDeleteRival(data.nickName)}
                  >
                    라이벌 끊기
                  </button>
                ) : (
                  <button
                    className="rival-btn"
                    onClick={() => handleAddRival(data.nickName)}
                  >
                    라이벌 맺기
                  </button>
                )}

                <button className="room-btn" onClick={() => openModal(data)}>
                  고양이방 보기
                </button>
              </li>
            );
          })}
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
