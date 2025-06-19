'use client';

import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

const HomePanel = dynamic(() => import('./HomePanel'), { ssr: false });
const BattlePanel = dynamic(() => import('./BattlePanel'), { ssr: false });
const PetRoomPanel = dynamic(() => import('./PetRoomPanel'), { ssr: false });

const RightPanel = () => {
  const pathname = usePathname();

  let PanelComponent = null;
  if (pathname.startsWith('/home')) PanelComponent = <HomePanel />;
  else if (pathname.startsWith('/battle')) PanelComponent = <BattlePanel />;
  else if (pathname.startsWith('/pet-room')) PanelComponent = <PetRoomPanel />;

  if (!PanelComponent) return null;

  return (
    <aside className="w-[300px] h-full border-l border-gray-200 bg-white px-4 py-6 shadow-inner">
      {PanelComponent}
    </aside>
  );
};

export default RightPanel;
