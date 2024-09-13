import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = () => {
  const [nickNm, setNickNm] = useState('');
  const [dataList, setDataList] = useState([]);
  const [show, setShow] = useState(false);

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
      //db연결하기
      //임시 데이터
      const Data = [
        { Nickname: 'user1', email: '11@', password: '11' },
        { Nickname: 'user2', email: '22@', password: '22' },
        { Nickname: 'user3', email: '33@', password: '33' },
      ];
      const filteredData = Data.filter((item) =>
        item.Nickname.toLowerCase().includes(input.toLowerCase()),
      );

      setDataList(filteredData);
      setShow(filteredData.length > 0);
    } catch (error) {
      console.error('Error', error);
      setDataList([]);
      setShow(false);
    }
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
      <button className="search-button">
        <img src="/img/searchbar.png" alt="검색" className="search-icon" />
      </button>

      {show && (
        <ul className="dropdown">
          {dataList.map((data, index) => (
            <li key={index} className="dropdown-itme">
              {data.Nickname}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
