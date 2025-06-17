'use client';

import { usePathname } from 'next/navigation';
import HomePanel from './HomePanel';
import BattlePanel from './BattlePanel';
import PetRoomPanel from './PetRoomPanel';

const DynamicRightPanel = () => {
  const pathname = usePathname();

  if (pathname.startsWith('/battle')) return <BattlePanel />;
  if (pathname.startsWith('/pet-room')) return <PetRoomPanel />;
  if (pathname.startsWith('/home')) return <HomePanel />;

  return null;
};

export default DynamicRightPanel;
