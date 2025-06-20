'use client';

import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

const HomePanel = dynamic(() => import('./HomePanel'), { ssr: false });
const BattlePanel = dynamic(() => import('./BattlePanel'), { ssr: false });
const PetRoomPanel = dynamic(() => import('./PetRoomPanel'), { ssr: false });

const RightPanel = () => {
  const pathname = usePathname();

  const PanelComponent = useMemo(() => {
    if (pathname.startsWith('/home')) return <HomePanel />;
    if (pathname.startsWith('/battle')) return <BattlePanel />;
    if (pathname.startsWith('/pet-room')) return <PetRoomPanel />;
    return null;
  }, [pathname]);

  return (
    <aside className="w-[300px] h-full border-l border-gray-200 bg-white px-4 py-6 shadow-inner">
      {PanelComponent}
    </aside>
  );
};

export default RightPanel;
