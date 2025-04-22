'use client';

import Link from 'next/link';
import React from 'react';
import clsx from 'clsx';

interface SidebarItemProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
}

const SidebarItem = ({ href, label, icon, active }: SidebarItemProps) => {
  return (
    <li>
      <Link
        href={href}
        className={clsx(
          'flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-base font-medium',
          active
            ? 'bg-blue-100 text-blue-600 border border-blue-300'
            : 'hover:bg-gray-100 text-gray-800',
        )}
      >
        <div className="shrink-0">{icon}</div>
        <span>{label}</span>
      </Link>
    </li>
  );
};

export default SidebarItem;
