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

      <div className="col-span-3">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
          libero magni dicta omnis ad quidem voluptates consequatur doloremque
          dolorem in. Dolorum placeat, consectetur impedit perferendis vero
          officia cumque facere. Tempora?
        </p>
      </div>
    </div>
  );
};

export default DashboardLayout;
