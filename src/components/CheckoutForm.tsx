'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { format } from 'date-fns'; // For date formatting
import expertsData from '../../src/data/expertsData';

const CheckoutPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const expertId = searchParams.get('expertId');
  const selectedDate = searchParams.get('date');
  const selectedTimeSlot = searchParams.get('time');
  const [expert, setExpert] = useState(null);
  const [loading, setLoading] = useState(true)



 // Fetch expert data based on expertId
 useEffect(() => {
  if (expertId) {
    const fetchedExpert = expertsData.find((e) => e.id === expertId);
    if (fetchedExpert) {
      setExpert(fetchedExpert);
    } else {
      console.error('Expert not found');
    }
    setLoading(false);
  }
}, [expertId]);

  const handleProceedToConfirmation = () => {
    if (expert && selectedDate && selectedTimeSlot) {
      // Simulate confirmation or finalization of the consultation
      alert('Consultation booked successfully!');
      // Optionally, navigate to a confirmation page or reset the form
    } else {
      alert('Please make sure all fields are filled.');
    }
  };

  if (loading) {
    return <p style={{ marginTop: '200px', marginBottom: '200px', textAlign: 'center' }}>Loading expert information...</p>;
  }

  if (!expert) {
    return <p style={{ marginTop: '200px', marginBottom: '200px', textAlign: 'center' }}>Expert not found.</p>;
  }

  return (
    <div className="checkout-wrapper">
      <div className="checkout-container">
        {expert ? (
          <>
            <h3>Consultation Summary</h3>
            <div className="consultation-details">
              <div className="detail">
                <strong>Expert:</strong> {expert.name}
              </div>
              <div className="detail">
                <strong>Expertise:</strong> {expert.expertise}
              </div>
              <div className="detail">
                <strong>Selected Date:</strong> {selectedDate ? format(new Date(selectedDate), 'dd/MM/yyyy') : 'N/A'}
              </div>
              <div className="detail">
                <strong>Selected Time:</strong> {selectedTimeSlot || 'N/A'}
              </div>
            </div>

            <button onClick={handleProceedToConfirmation} className="btn btn-primary">
              Confirm Consultation
            </button>
          </>
        ) : (
          <p style={{ marginTop: '200px', marginBottom: '200px', textAlign: 'center' }}>Loading expert information...</p>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
