'use client';

import {
  LayoutDashboard,
  FileClock,
  WalletCards,
  Settings,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Usage from './usage';

const menu = [
  {
    name: 'Dashboard',
    icon: LayoutDashboard,
    path: '/dashboard',
  },
  {
    name: 'History',
    icon: FileClock,
    path: '/dashboard/history',
  },
  {
    name: 'Billing',
    icon: WalletCards,
    path: '/dashboard/billing',
  },
  {
    name: 'Settings',
    icon: Settings,
    path: '/dashboard/settings',
  },
];

const SideNav = () => {
  const path = usePathname();

  return (
    <div className="flex flex-col h-full">
      <ul className="flex-1 space-y-2">
        {menu.map((item, index) => (
          <li
            key={index}
            className={`${
              path === item.path
                ? 'border-primary text-primary'
                : 'hover:border-primary hover:text-primary'
            } flex m-2 mr-4 p-2 rounded-lg cursor-pointer border`}
          >
            <div className="flex justify-center items-center md:justify-start w-full">
              <Link href={item.path} className="flex">
                <item.icon />{' '}
                <span className="ml-2 hidden md:inline">{item.name}</span>
              </Link>
            </div>
          </li>
        ))}
      </ul>

      <div className="pb-20 mt-auto">
        <Usage />
      </div>
    </div>
  );
};

export default SideNav;
