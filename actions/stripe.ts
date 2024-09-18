'use server';

import { currentUser } from '@clerk/nextjs/server';
import db from '@/utils/db';
import Transaction from '@/models/transaction';
import stripe from '@/utils/stripe';

interface CheckoutSessionResponse {
  url?: string;
  error?: string;
}

export async function createCheckoutSession(): Promise<CheckoutSessionResponse> {
  const user = await currentUser();
  const customerEmail = user?.emailAddresses[0]?.emailAddress;

  if (!customerEmail) {
    return { error: 'User not found' };
  }

  try {
    await db();

    // find the strip customer id from database
    const existingTransaction = await Transaction.findOne({ customerEmail });
    if (existingTransaction) {
      // retrieve the customer subscription from stripe
      const subscriptions = await stripe.subscriptions.list({
        customer: existingTransaction.customerId,
        status: 'all',
        limit: 1,
      });

      // check if any subscription is active
      const currentSubscription = subscriptions.data.find(
        (sub) => sub.status === 'active'
      );
      if (currentSubscription) {
        return { error: 'You already have an active subscription' };
      }
    }

    // create a new checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: process.env.STRIPE_MONTHLY_PRICE_ID, quantity: 1 }],
      mode: 'subscription',
      customer_email: customerEmail,
      success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}`,
    });

    return { url: session.url ?? undefined };
  } catch (error) {
    console.error(error);
    return { error: 'Error creating stripe checkout session.' };
  }
}
