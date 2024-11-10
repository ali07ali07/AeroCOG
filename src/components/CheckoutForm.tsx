'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { format } from 'date-fns'; // For date formatting

const CheckoutPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const expertId = searchParams.get('expertId');
  const selectedDate = searchParams.get('date');
  const selectedTimeSlot = searchParams.get('time');
  const [expert, setExpert] = useState(null);

  // Sample experts data (you can replace this with an API call to fetch expert details)
  const experts = [
    { id: '1', name: 'Dr. John Doe', expertise: 'Aerospace Engineer' },
    { id: '2', name: 'Dr. Jane Smith', expertise: 'Aerospace Researcher' },
    { id: '3', name: 'Dr. Alice Brown', expertise: 'Satellite Engineer' },
  ];

  useEffect(() => {
    if (expertId) {
      const fetchedExpert = experts.find((e) => e.id === expertId);
      if (fetchedExpert) setExpert(fetchedExpert);
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
          <p>Loading expert information...</p>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
