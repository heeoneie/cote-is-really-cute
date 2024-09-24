import React from 'react';
import '../styles/SearchBar.css';
import request from '../axios/axios';

const SearchBar = () => {
  const [nickNm, setNickNm] = React.useState('');
  const [dataList, setDataList] = React.useState([]);
  const [show, setShow] = React.useState(false);

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
      const response = await request.get(`/users/search?nickname=${input}`);
      const result = await response.data;
      const filteredData = result.filter((item) =>
        item.nickname.toLowerCase().includes(input.toLowerCase()),
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
      <button className="search-btn">
        <img src="/img/searchbar.png" alt="검색" className="search-icon" />
      </button>

      {show && (
        <ul className="dropdown">
          {dataList.map((data, index) => (
            <li key={index} className="dropdown-item">
              {data.nickname}
              <button className="rival-btn">라이벌 맺기</button>
              <button className="room-btn">고양이방 보기</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
