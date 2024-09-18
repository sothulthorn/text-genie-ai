'use client';

import Image from 'next/image';
import { Button } from '../ui/button';
import toast from 'react-hot-toast';
import { SignInButton, useUser } from '@clerk/nextjs';
import { createCheckoutSession } from '@/actions/stripe';
import { useRouter } from 'next/navigation';

const PlanCard = ({ name, image }: { name: string; image: string }) => {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  const handleCheckout = async () => {
    if (name === 'Free') {
      router.push('/dashboard');
      return;
    } else {
      try {
        const response = await createCheckoutSession();
        const { url, error } = response;

        if (error) {
          toast.error(error);
          return;
        }

        if (url) {
          window.location.href = url;
        }
      } catch (error) {
        toast.error('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 border">
      <Image
        src={image}
        width={100}
        height={100}
        className="m-5"
        alt="monthly membership"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name} Membership</div>
        <p className="text-grey-700 dark:text-grey-300 text-base">
          Enjoy{' '}
          {name === 'Free'
            ? 'limited AI generated content forever for just $0.00/month'
            : 'unlimited AI generated content forever for just $9.99/month'}
        </p>
        <ul className="m-5">
          <li>
            🌟 {name === 'Free' ? 'Limited' : 'Unlimited'} word generation
          </li>
          <li>🧠 Advanced AI features</li>
          <li>⚡️ Faster processing times</li>
          <li>🛠️ {name === 'Free' ? '' : 'Priority'} customer support</li>
        </ul>
      </div>

      {!isLoaded ? (
        ''
      ) : !isSignedIn ? (
        <div className="px-5 pb-10">
          <Button>
            <SignInButton />
          </Button>
        </div>
      ) : (
        <div className="px-5 pb-10">
          <Button onClick={handleCheckout}>Get Started</Button>
        </div>
      )}
    </div>
  );
};

export default PlanCard;
