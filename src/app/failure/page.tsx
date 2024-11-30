// src/app/failure/page.tsx
"use client";
import { useSearchParams } from 'next/navigation';

export default function FailurePage() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status'); // "cancel" or "failure"
  const message =
    status === 'cancel'
      ? 'You have canceled the payment process.'
      : 'Payment failed due to an error. Please try again.';

  return (
    <div>
      <h1>Payment Failed</h1>
      <p>{message}</p>
    </div>
  );
}