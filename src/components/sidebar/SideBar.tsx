'use client';

import { usePathname, useRouter } from 'next/navigation';
import SidebarItem from './SideBarItem';
import LogoutButton from './LogoutButton';
import useAuthStore from '@stores/authStore';
import { Swords, Book, Cat, Smile } from 'lucide-react';

const items = [
  { href: '/', label: '학습', icon: <Book size={20} /> },
  { href: '/battle', label: '대결', icon: <Swords size={20} /> },
  { href: '/my-page', label: '마이페이지', icon: <Smile size={20} /> },
  { href: '/pet-room', label: '고양이방', icon: <Cat size={20} /> },
];

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <aside className="top-0 left-0 h-screen w-60 bg-white border-r border-gray-200 flex flex-col justify-between p-4 shadow-md z-50 overflow-y-auto">
      <div>
        <h1 className="text-center text-green-500 text-xl font-bold mb-6 font-bitbit">
          코테는 정말 귀여워
        </h1>
        <ul className="space-y-2">
          {items.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              active={pathname === item.href}
            />
          ))}
        </ul>
      </div>
      <LogoutButton onLogout={handleLogout} />
    </aside>
  );
};

export default Sidebar;
