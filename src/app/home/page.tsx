'use client';

import SearchBar from '@components/home/SearchBar';
import CategoryBtn from '@components/category/CategoryBtn';
import PetStatus from '@components/home/PetStatus';
import LoginStreak from '@components/home/LoginStreak';
import LandingPage from '@app/page';
import useAuthStore from '@stores/authStore';

const HomePage = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-4 py-6">
      {isLoggedIn ? (
        <>
          <SearchBar />
          <CategoryBtn />
          <PetStatus />
          <LoginStreak />
        </>
      ) : (
        <LandingPage />
      )}
    </main>
  );
};

export default HomePage;
