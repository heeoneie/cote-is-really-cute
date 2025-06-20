'use client';

import HomeMain from '@components/home/HomeMain';
import LandingPage from '@app/(marketing)/page';
import useAuthStore from '@stores/authStore';

const HomePage = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {isLoggedIn ? <HomeMain /> : <LandingPage />}
    </main>
  );
};

export default HomePage;
