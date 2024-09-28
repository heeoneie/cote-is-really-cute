import React from 'react';

function useLoginStreak() {
  const [days, setDays] = React.useState(0);

  React.useEffect(() => {
    const email = localStorage.getItem('email');
    const lastVisit = localStorage.getItem(`lastVisit_${email}`);
    const loginDays = localStorage.getItem(`loginDays_${email}`);

    if (loginDays === null) {
      localStorage.setItem(`loginDays_${email}`, 0);
    }

    const today = new Date();
    const formattedToday = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const storedLoginDays =
      parseInt(localStorage.getItem(`loginDays_${email}`), 10) || 0;

    if (lastVisit === formattedToday) {
      setDays(storedLoginDays);
    } else if (lastVisit) {
      const lastDate = new Date(lastVisit);
      const differenceInDays = Math.floor(
        (today - lastDate) / (1000 * 60 * 60 * 24),
      );

      if (differenceInDays > 1) {
        setDays(0);
        localStorage.setItem(`loginDays_${email}`, 0);
      } else if (differenceInDays === 1) {
        const newDays = storedLoginDays + 1;
        setDays(newDays);
        localStorage.setItem(`loginDays_${email}`, newDays);
      }
    } else {
      setDays(0);
    }

    localStorage.setItem(`lastVisit_${email}`, formattedToday);
  }, []);

  const incrementLoginDays = () => {
    const email = localStorage.getItem('email');
    const currentDays =
      parseInt(localStorage.getItem(`loginDays_${email}`), 10) || 0;
    const newDays = currentDays + 1;
    setDays(newDays);
    localStorage.setItem(`loginDays_${email}`, newDays);
  };

  return { days, incrementLoginDays };
}

export default useLoginStreak;
