import React from 'react';

function useLoginStreak() {
  const [days, setDays] = React.useState(1); // 기본적으로 1일째

  React.useEffect(() => {
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
        setDays(0);
        localStorage.setItem('loginDays', 0);
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

  return { days, incrementLoginDays };
}

export default useLoginStreak;
