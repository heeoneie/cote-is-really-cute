import { useEffect, useState } from 'react';

function useLoginStreak() {
  const [days, setDays] = useState(1); // 기본적으로 1일째

  useEffect(() => {
    const lastVisit = localStorage.getItem('lastVisit');
    const loginDays = localStorage.getItem('loginDays');

    const today = new Date();
    const formattedToday = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

    const storedLoginDays = parseInt(loginDays, 10) || 0;

    if (lastVisit === formattedToday) {
      setDays(storedLoginDays);
    } else if (lastVisit) {
      const lastDate = new Date(lastVisit);
      const differenceInDays = Math.floor(
        (today - lastDate) / (1000 * 60 * 60 * 24),
      );

      if (differenceInDays === 1) {
        const newDays = storedLoginDays + 1;
        setDays(newDays);
        localStorage.setItem('loginDays', newDays);
      } else {
        // 이전에 방문했으나 문제를 풀지 않은 경우
        setDays(0); // 출석일을 0으로 설정
        localStorage.setItem('loginDays', 0); // 로컬 스토리지도 0으로 설정
      }
    } else {
      setDays(1);
      localStorage.setItem('loginDays', 1);
    }

    localStorage.setItem('lastVisit', formattedToday);
  }, []);

  const incrementLoginDays = () => {
    const currentDays = parseInt(localStorage.getItem('loginDays'), 10) || 0;
    const newDays = currentDays + 1;
    setDays(newDays);
    localStorage.setItem('loginDays', newDays);
  };

  return { days, incrementLoginDays }; // 출석 증가 함수 반환
}

export default useLoginStreak;
