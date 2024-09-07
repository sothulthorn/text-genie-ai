'use client';

import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from '@clerk/nextjs';
import Link from 'next/link';
import { ModeToggle } from './mode-toggle';
import { Toaster } from 'react-hot-toast';

const TopNav = () => {
  const { isSignedIn, user } = useUser();

  return (
    <nav className="flex justify-between items-center p-2 shadow">
      <Toaster />
      <Link href="/">TextGenie.AI</Link>
      <div className="flex items-center">
        {isSignedIn && (
          <Link href="/dashboard" className="mr-2">
            {`${user?.fullName}`}'s Dashboard
          </Link>
        )}

        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>

        <div className="ml-10">
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
