'use client';
import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();
  const expertId = searchParams.get('expertId');
  const dateString = searchParams.get('date');  // Date from URL
  const time = searchParams.get('time');  // Time from URL

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

    // Validate and prepare data for Firestore
    const isValidDate = dateString && !isNaN(Date.parse(dateString));
    const validDate = isValidDate ? new Date(dateString) : new Date(); // Keep as Date object
    const validTime = time || 'Not Set'; // Fallback to 'Not Set' if time is not provided

    if (!userName || !whatsappNumber) {
      alert("Please fill in all the details.");
      setLoading(false);
      return;
    }

    // Combine date and time
    const [hours, minutes] = validTime.split(':');
    validDate.setHours(parseInt(hours, 10), parseInt(minutes, 10)); // Set the time in the Date object

    // Convert to IST (Indian Standard Time: UTC +5:30)
    const istDate = toZonedTime(validDate, 'Asia/Kolkata');

    const appointment = {
      expertId,
      expertName: expert ? expert.name : 'Not Available',
      userName,
      userEmail,
      whatsappNumber,
      date: istDate.toISOString(), // Save as ISO string (with correct date and time in IST)
      time: validTime,
      createdAt: new Date().toISOString(),
    };

    try {
      const docRef = await addDoc(collection(db, 'appointments'), appointment);
      const documentId = docRef.id;

      alert(`Consultation booked successfully! Your booking ID is: ${documentId}`);
      router.push('/confirmation');
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('There was an error booking your consultation.');
    } finally {
      setLoading(false);
    }
  };

  // Format the date from URL (which is in ISO string format)
  const formattedDate = dateString ? new Date(dateString) : new Date();
  const isValidDate = formattedDate && !isNaN(formattedDate.getTime());
  const finalDate = isValidDate ? formattedDate : new Date();

  const formattedTime = time || 'Not Set';  // Use 'Not Set' as fallback if no time is provided

  // Format the date and time
  const displayDate = format(finalDate, 'dd/MM/yyyy');
  const displayTime = formattedTime;  // You can use 'HH:mm' format if you prefer 24-hour format

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Breadcrumb pageName={pageName} description={description} />
      <div className="checkout-page-wrapper">
        <div className="checkout-page-container mt-36 p-8 max-w-4xl mx-auto rounded-lg shadow-lg">
          <h3 className="text-3xl font-semibold text-center">Summary</h3>
          {isValidDate ? (
            <h4 className="text-xl text-center text-gray-600 mt-4">
              Consulting with Expert ID: {expertId} on {displayDate} at {displayTime}
            </h4>
          ) : (
            <h4 className="text-xl text-center text-red-600 mt-4">Invalid Date</h4>
          )}

          <div className="consultation-summary mt-6">
            <div className="text-center mb-4">
              {/* Displaying expert's name dynamically */}
              <p><strong>Expert:</strong> {expert ? `Dr. ${expert.name}` : 'Expert not found'}</p>
              <br />
              <p><strong>Date:</strong> {isValidDate ? displayDate : 'Invalid date'}</p>
              <br />
              <p><strong>Time:</strong> {displayTime}</p>
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
    </Suspense>
  );
};

export default CheckoutPage;
