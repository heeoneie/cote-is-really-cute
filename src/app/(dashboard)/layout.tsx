'use client';

import SideBar from '@components/sidebar/SideBar';
import RightPanel from '@components/layout/RightPanel';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex-1 flex overflow-hidden">
        <main className="flex-1 overflow-y-auto">{children}</main>
        <RightPanel />
      </div>
    </div>
  );
}
