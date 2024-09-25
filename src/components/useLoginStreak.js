import { useEffect, useState } from 'react';

function useLoginStreak() {
  const [days, setDays] = useState(1); // 기본적으로 1일째

  useEffect(() => {
    const lastVisit = localStorage.getItem('lastVisit');
    const loginDays = localStorage.getItem('loginDays');

    const today = new Date();
    const formattedToday = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`; // 월을 1부터 시작하도록 수정

    // 로그인 일수의 기본값을 0으로 설정하여 NaN 방지
    const storedLoginDays = parseInt(loginDays, 10) || 0;

    console.log('lastVisit:', lastVisit); // lastVisit 로그
    console.log('loginDays:', loginDays); // loginDays 로그
    console.log('storedLoginDays:', storedLoginDays); // 저장된 로그인 일수 로그
    console.log('formattedToday:', formattedToday); // 오늘 날짜 로그

    if (lastVisit === formattedToday) {
      // 오늘 이미 접속한 경우, 상태를 그대로 유지
      setDays(storedLoginDays);
    } else if (lastVisit) {
      const lastDate = new Date(lastVisit);
      const differenceInDays = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));

      if (differenceInDays === 1) {
        // 연속 접속일이 1일 차이일 때
        const newDays = storedLoginDays + 1; // 수정된 로그인 일수 사용
        setDays(newDays);
        localStorage.setItem('loginDays', newDays);
      } else {
        // 연속 접속이 끊어진 경우, 1일째로 초기화
        setDays(1);
        localStorage.setItem('loginDays', 1);
      }
    } else {
      // 처음 접속한 경우
      setDays(1);
      localStorage.setItem('loginDays', 1);
    }

    // 현재 접속 날짜 업데이트
    localStorage.setItem('lastVisit', formattedToday);
    console.log('Updated lastVisit:', formattedToday); // 업데이트된 날짜 로그
  }, []);

  return days;
}

export default useLoginStreak;
