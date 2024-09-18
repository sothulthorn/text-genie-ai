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
import Image from 'next/image';

const TopNav = () => {
  const { isSignedIn, user } = useUser();

  return (
    <nav className="flex justify-between items-center p-2 shadow">
      <Toaster />
      <Link href="/" className="flex justify-center items-center">
        <Image
          src="/document-ai.svg"
          alt="Logo"
          width={50}
          height={50}
          className="cursor-pointer"
        />
        <h2 className="text-[#4285f4] font-bold">TextGenie.AI</h2>
      </Link>

      <Link href="/membership">🔥 Join free or $9.99/month</Link>

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
