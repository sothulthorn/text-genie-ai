'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { usageCount } from '@/actions/ai';
import { useUser } from '@clerk/nextjs';

interface UsageContextType {
  count: number;
  fetchUsage: () => void;
}

const UsageContext = createContext<UsageContextType | null>(null);

export const UsageProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  // State
  const [count, setCount] = useState(0);

  // Hooks
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress || '';

  useEffect(() => {
    if (email) fetchUsage();
  }, [email]);

  const fetchUsage = async () => {
    const res = await usageCount(email);
    setCount(res);
  };

  return (
    <UsageContext.Provider value={{ count, fetchUsage }}>
      {children}
    </UsageContext.Provider>
  );
};

export const useUsage = () => {
  const context = useContext(UsageContext);
  if (context === null) {
    throw new Error('useUage must be used within a UsageProvider.');
  }

  return context;
};
