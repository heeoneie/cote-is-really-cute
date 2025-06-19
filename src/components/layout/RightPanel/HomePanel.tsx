'use client';

import LoginStreak from '@components/home/LoginStreak';
import PetStatus from '@components/home/PetStatus';

export default function HomePanel() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <LoginStreak />
      <PetStatus />
    </div>
  );
}
