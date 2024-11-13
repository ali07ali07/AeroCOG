'use client';
import { Suspense } from 'react';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { format } from 'date-fns';
import { db, collection, addDoc, Timestamp } from '../../components/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Breadcrumb from '../../components/Common/Breadcrumb';
import expertsData from '../../data/expertsData';

const CheckoutPage = () => {
  const pageName = "Checkout";
  const description = "Review your consultation details and complete the booking process.";
  const router = useRouter();
  const searchParams = useSearchParams();
  const expertId = searchParams.get('expertId');
  const date = searchParams.get('date');
  const time = searchParams.get('time');
  const dateString = searchParams.get('date');  // Date from URL
  const timeString = searchParams.get('time');  // Time from URL
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [expert, setExpert] = useState(null); // State for expert data


  

  // Fetch user data and expert data
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setUserName(user.displayName || '');
        setUserEmail(user.email || '');
      } else {
        router.push('/signin');
      }
    });

   
    if (expertId) {
      const selectedExpert = expertsData.find((e) => e.id === expertId);
      setExpert(selectedExpert);
    }

    return () => unsubscribe();
  }, [expertId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formattedDate = date ? new Date(date) : new Date();
    const isValidDate = formattedDate && !isNaN(formattedDate.getTime());
    const validDate = isValidDate ? Timestamp.fromDate(formattedDate) : Timestamp.now();
    const validTime = time || 'Not Set';

    if (!userName || !whatsappNumber) {
      alert("Please fill in all the details.");
      setLoading(false);
      return;
    }

    const appointment = {
      expertId,
      expertName: expert ? expert.name : 'Not Available',  // Dynamically set expert name
      userName,
      userEmail,
      whatsappNumber,
      date: validDate,
      time: validTime,
      createdAt: Timestamp.now(),
    };

    try {
      const docRef = await addDoc(collection(db, 'appointments'), appointment);
      const documentId = docRef.id;

      alert(`Consultation booked successfully! Your booking ID is: ${documentId}`);
      router.push('/Confirmation');
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('There was an error booking your consultation.');
    } finally {
      setLoading(false);
    }
  };

   // Parse date from URL (ensure it's in dd/MM/yyyy format)
   const parseDate = (dateString) => {
    // Decode the URL date string (e.g., "16%2F11%2F2024" -> "16/11/2024")
    const decodedDateString = decodeURIComponent(dateString);
    const parts = decodedDateString.split('/'); // Split by '/'
    
    // Handle the format: "dd/MM/yyyy"
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return new Date(`${year}-${month}-${day}`);
    }
    return new Date();
  };


 // Format the date for display in the summary
 const formattedDate = dateString ? parseDate(dateString) : new Date();
 const isValidDate = formattedDate && !isNaN(formattedDate.getTime());
 const finalDate = isValidDate ? formattedDate : new Date();
 const isFinalDateValid = finalDate && !isNaN(finalDate.getTime());

  return (
   <> <Breadcrumb pageName={pageName} description={description} />
    <div className="checkout-page-wrapper">
      <div className="checkout-page-container mt-36 p-8 max-w-4xl mx-auto rounded-lg shadow-lg">
        <h3 className="text-3xl font-semibold text-center">Summary</h3>
        {isFinalDateValid ? (
          <h4 className="text-xl text-center text-gray-600 mt-4">
            Consulting with Expert ID: {expertId} on {format(finalDate, 'dd/MM/yyyy')} at {time}
          </h4>
        ) : (
          <h4 className="text-xl text-center text-red-600 mt-4">Invalid Date</h4>
        )}

        <div className="consultation-summary mt-6">
          <div className="text-center mb-4">
            {/* Displaying expert's name dynamically */}
            <p><strong>Expert:</strong> {expert ? `Dr. ${expert.name}` : 'Expert not found'}</p>
            <br />
            <p><strong>Date:</strong> {isFinalDateValid ? format(finalDate, 'dd/MM/yyyy') : 'Invalid date'}</p>
            <br />
            <p><strong>Time:</strong> {time}</p>
          </div>
        </div>

        <h4 className="text-2xl font-semibold mt-6 mb-4">Enter Your Details</h4>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="input-group">
            <label htmlFor="userName" className="block">Your Name</label>
            <input
              id="userName"
              type="text"
              value={userName}
              className="input-field cursor-not-allowed"
              disabled
              style={{ cursor: 'not-allowed' }}
            />
          </div>

          <div className="input-group">
            <label htmlFor="userEmail" className="block">Email</label>
            <input
              id="userEmail"
              type="email"
              value={userEmail}
              className="input-field cursor-not-allowed"
              disabled
              style={{ cursor: 'not-allowed' }}
            />
          </div>
          <div className="input-group">
            <label htmlFor="whatsappNumber" className="block">WhatsApp Number</label>
            <input
              id="whatsappNumber"
              type="tel"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              className="input-field"
              placeholder="Enter your WhatsApp number"
              required
            />
          </div>

          <div className="text-center mt-8">
            <button
              type="submit"
              className="submit-btn-consultation"
              disabled={loading}
            >
              {loading ? 'Booking...' : 'Book Consultation'}
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

const CheckoutPageWithSuspense = () => (
  <Suspense fallback={<div style={{ marginTop: '200px', marginBottom: '200px', textAlign: 'center' }}>Loading...</div>}>
    <CheckoutPage />
  </Suspense>
);

export default CheckoutPageWithSuspense;
