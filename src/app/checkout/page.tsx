"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../components/firebase"; 
import { format } from "date-fns";
import { toZonedTime } from 'date-fns-tz'; // Import the conversion function
import Breadcrumb from "../../components/Common/Breadcrumb";
import expertsData from "@/data/expertsData";

const CheckoutPage = () => {
  const pageName = "Checkout";
  const description = "Review your consultation details and complete the booking process.";
  const router = useRouter();
  
  const [searchParams, setSearchParams] = useState(null); 
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [expert, setExpert] = useState(null);

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

    // Set the search parameters
    const urlParams = new URLSearchParams(window.location.search);
    const expertId = urlParams.get('expertId');
    const dateString = urlParams.get('date');
    const time = urlParams.get('time');
    
    setSearchParams({ expertId, dateString, time });

    if (expertId) {
      const selectedExpert = expertsData.find((e) => e.id === expertId);
      setExpert(selectedExpert);
    }

    return () => unsubscribe();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { expertId, dateString, time } = searchParams || {};

    // Validate and prepare data for Firestore
    const isValidDate = dateString && !isNaN(Date.parse(dateString));
    const validDate = isValidDate ? new Date(dateString) : new Date();
    const validTime = time || 'Not Set';

    if (!userName || !whatsappNumber) {
      alert("Please fill in all the details.");
      setLoading(false);
      return;
    }

    // Combine date and time
    const [hours, minutes] = validTime.split(':');
    validDate.setHours(parseInt(hours, 10), parseInt(minutes, 10)); 

    // Convert to IST (Indian Standard Time: UTC +5:30)
    const istDate = toZonedTime(validDate, 'Asia/Kolkata');

    const appointment = {
      expertId,
      expertName: expert ? expert.name : 'Not Available',
      userName,
      userEmail,
      whatsappNumber,
      date: istDate.toISOString(),
      time: validTime,
      createdAt: new Date().toISOString(),
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

  if (!searchParams) {
    return <p style={{ marginTop: '200px', marginBottom: '200px', textAlign: 'center' }}>Loading...</p>;
  }

  const { dateString, time } = searchParams;
  const formattedDate = dateString ? new Date(dateString) : new Date();
  const isValidDate = formattedDate && !isNaN(formattedDate.getTime());
  const finalDate = isValidDate ? formattedDate : new Date();
  const formattedTime = time || 'Not Set';
  const displayDate = format(finalDate, 'dd/MM/yyyy');
  const displayTime = formattedTime;

  return (
    <>
      <Breadcrumb pageName={pageName} description={description} />
      <div className="checkout-page-wrapper">
        <div className="checkout-page-container mt-36 p-8 max-w-4xl mx-auto rounded-lg shadow-lg">
          <h3 className="text-3xl font-semibold text-center">Summary</h3>
          {isValidDate ? (
            <h4 className="text-xl text-center text-gray-600 mt-4">
              Consulting with Expert ID: {searchParams.expertId} on {displayDate} at {displayTime} IST
            </h4>
          ) : (
            <h4 className="text-xl text-center text-red-600 mt-4">Invalid Date</h4>
          )}

          <div className="consultation-summary mt-6">
            <div className="text-center mb-4">
              <p><strong>Expert:</strong> {expert ? `Dr. ${expert.name}` : 'Expert not found'}</p>
              <br />
              <p><strong>Date:</strong> {isValidDate ? displayDate : 'Invalid date'}</p>
              <br />
              <p><strong>Time:</strong> {displayTime} IST</p>
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
              <p className="text-red-600 text-sm mt-1"> You can change your name on profile page</p>
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
              <p className="text-red-600 text-sm mt-1">You cannot change your email ID!</p>
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

export default CheckoutPage;
