import SideNav from '@/components/ui/nav/side-nav';
import React from 'react';

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-1">
        <SideNav />
      </div>

      <div className="col-span-3">{children}</div>
    </div>
  );
};

export default DashboardLayout;
