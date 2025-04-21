import React, { useCallback, useState } from 'react';
import { searchUser } from '@api/user';
import { addRival, deleteRival } from '@api/rival';
import RoomModal from '@components/modals/RoomModal';
import { User } from '../../types/domain/user';

const SearchBar = () => {
  const [nickName, setNickName] = useState<string>('');
  const [userList, setUserList] = useState<User[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const email =
    typeof window !== 'undefined' ? (localStorage.getItem('email') ?? '') : '';

  const handleSearch = useCallback(
    async (input: string) => {
      if (!email) return;

      try {
        const response: User[] = await searchUser(input, email);
        setUserList(response);
        setIsDropdownVisible(response.length > 0);
      } catch (error) {
        console.error('Error:', error);
        setUserList([]);
        setIsDropdownVisible(false);
      }
    },
    [email],
  );

  const handleAddRival = useCallback(
    async (user: string) => {
      const data = { userEmail: email, rivalNickName: user };
      try {
        const response = await addRival(data);
        if (response) {
          alert(response.message);
          await handleSearch(nickName); // 재검색
        }
      } catch (error) {
        console.error('라이벌 추가 실패:', error);
        alert('라이벌 추가에 실패했습니다. 다시 시도해주세요.');
      }
    },
    [email, nickName, handleSearch],
  );

  const handleDeleteRival = useCallback(
    async (user: string) => {
      try {
        const response = await deleteRival(email, user);
        if (response) {
          alert(response.message);
          await handleSearch(nickName); // 재검색
        }
      } catch (error) {
        console.error('라이벌 삭제 실패:', error);
        alert('라이벌 삭제에 실패했습니다. 다시 시도해주세요.');
      }
    },
    [email, nickName, handleSearch],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setNickName(input);
    if (!input.trim()) {
      setUserList([]);
      setIsDropdownVisible(false);
    } else {
      handleSearch(input);
    }
  };

  const openModal = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="relative w-full p-5">
      <input
        type="text"
        placeholder="유저검색"
        className="w-full px-4 py-2 rounded-full border-2 border-[#82d21c] focus:outline-none focus:ring-2 focus:ring-green-300"
        value={nickName}
        onChange={handleInputChange}
      />
      <button
        className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-none border-none cursor-pointer"
        onClick={() => handleSearch(nickName)}
      >
        <img src="/searchbar.png" alt="검색" className="w-6 h-6" />
      </button>

      {isDropdownVisible && (
        <ul className="absolute top-[calc(100%+10px)] bg-white border border-gray-300 rounded-b-xl max-h-[150px] overflow-y-auto w-full z-10 shadow-lg list-none p-0 m-0">
          {userList.map((user) => (
            <li
              key={user.nickName}
              className="flex items-center p-2 hover:bg-gray-100"
            >
              <span className="flex-1">{user.nickName}</span>

              {user.isRival ? (
                <button
                  className="ml-auto px-4 py-1 bg-[#82d21c] text-white rounded-full hover:bg-green-700"
                  onClick={() => handleDeleteRival(user.nickName)}
                >
                  라이벌 끊기
                </button>
              ) : (
                <button
                  className="ml-auto px-3 py-1 rounded-full text-white bg-[#f28434] hover:bg-orange-600 text-sm"
                  onClick={() => handleAddRival(user.nickName)}
                >
                  라이벌 맺기
                </button>
              )}

              <button
                className="ml-2 px-4 py-1 bg-[#f28434] text-white rounded-full hover:bg-orange-600"
                onClick={() => openModal(user)}
              >
                고양이방 보기
              </button>
            </li>
          ))}
        </ul>
      )}

      <RoomModal
        show={isModalOpen}
        onClose={closeModal}
        selectedUser={selectedUser}
      />
    </div>
  );
};

export default SearchBar;
