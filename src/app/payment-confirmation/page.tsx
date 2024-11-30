'use client';
import { useEffect, useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { db, collection, addDoc, Timestamp } from '../../components/firebase';
import { doc, setDoc } from 'firebase/firestore';
import Breadcrumb from "../../components/Common/Breadcrumb";

export default function PaymentConfirmation() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const createAppointmentDocument = async (expertId, date, time) => {
    try {
      const appointmentData = {
        expertId,
        date,
        time,
        status: 'confirmed',
        userEmail: 'john@example.com', // This should be dynamically fetched
        userName: 'John Doe', // This should be dynamically fetched
        createdAt: Timestamp.fromDate(new Date()),
      };

      // Create the document in Firestore
      await setDoc(doc(db, 'appointments', expertId + '_' + new Date().getTime()), appointmentData);
      setLoading(false);
      router.push('/confirmation'); // Redirect to confirmation page
    } catch (err) {
      console.error('Error creating appointment document:', err);
      setError('Something went wrong. Please try again later.');
      setLoading(false);
    }
  };

  const PaymentStatus = () => {
    const searchParams = useSearchParams();

    useEffect(() => {
      // Retrieve the query parameters from the URL using searchParams
      const expertId = searchParams.get('expertId');
      const date = searchParams.get('date');
      const time = searchParams.get('time');
      const status = searchParams.get('status');

      if (status === "success") {
        // Payment successful: Create a Firestore document
        createAppointmentDocument(expertId, date, time);
      } else {
        // Payment failed
        setError('Payment was not successful. Please try again.');
        setLoading(false);
      }
    }, [searchParams]);

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <>
        <Breadcrumb pageName="Payment Confirmation" description="Check your payment status" />
        <div className="confirmation-page-container mt-36 p-8 max-w-4xl mx-auto rounded-lg shadow-lg">
          <h3 className="text-3xl font-semibold text-center">Payment Status</h3>
          <div>
            {error ? (
              <div>{error}</div>
            ) : (
              <div>
                <h1>Payment Successful!</h1>
                <p>Your appointment has been successfully booked.</p>
              </div>
            )}
          </div>
          <div className="text-center mt-8">
            <button
              onClick={() => router.push("/")}
              className="bg-primary text-white px-6 py-3 rounded-md"
            >
              Return to Home
            </button>
          </div>
        </div>
      </>
    );
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentStatus />
    </Suspense>
  );
};
