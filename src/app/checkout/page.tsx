'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { format } from 'date-fns';
import { db, collection, addDoc, Timestamp } from '../../components/firebase'; // Ensure you import Timestamp
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Breadcrumb from '../../components/Common/Breadcrumb';

const CheckoutPage = () => {
  const pageName = "Checkout";
  const description = "Review your consultation details and complete the booking process.";
  <Breadcrumb pageName={pageName} description={description} />
  const router = useRouter();
  const searchParams = useSearchParams();
  const expertId = searchParams.get('expertId');
  const date = searchParams.get('date');
  const time = searchParams.get('time');
  

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  // Fetch user info from Firebase Authentication
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setUserName(user.displayName || ''); // Use the user's display name if available
        setUserEmail(user.email || ''); // Use the user's email
      } else {
        router.push('/signin'); // Redirect to sign-in if user is not authenticated
      }
    });
    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formattedDate = date ? new Date(date) : null;
  const isValidDate = formattedDate && !isNaN(formattedDate.getTime());
  const validDate = isValidDate ? Timestamp.fromDate(formattedDate) : Timestamp.now();
  const validTime = time || 'Not Set'; // Default time if invalid


    // Validate the form data
    if (!userName || !whatsappNumber) {
      alert("Please fill in all the details.");
      setLoading(false);
      return;
    }

    // Create the appointment object
    const appointment = {
      expertId,
      expertName: expertId === '1' ? 'Dr. John Doe' : expertId === '2' ? 'Dr. Jane Smith' : 'Dr. Alice Brown',
      userName,
      userEmail,
      whatsappNumber,
      date: validDate,
      time: validTime,
      createdAt: Timestamp.now(),
    };

    try {
      // Push the appointment data to Firestore
      await addDoc(collection(db, 'appointments'), appointment);
      alert('Consultation booked successfully!');
      router.push('/confirmation'); // Redirect to a confirmation page
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('There was an error booking your consultation.');
    } finally {
      setLoading(false);
    }
  };

  const formattedDate = date ? new Date(date) : new Date();
  const isValidDate = formattedDate && !isNaN(formattedDate.getTime());

  const finalDate = isValidDate ? formattedDate : new Date();
  const isFinalDateValid = finalDate && !isNaN(finalDate.getTime());

  return (
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
            <p><strong>Expert:</strong> Dr. {expertId === '1' ? 'John Doe' : expertId === '2' ? 'Jane Smith' : 'Alice Brown'}</p>
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
              onChange={(e) => setUserName(e.target.value)}
              className="input-field"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="userEmail" className="block">Email</label>
            <input
              id="userEmail"
              type="email"
              value={userEmail}
              className="input-field cursor-not-allowed" // Added class here
              disabled // Ensure the email is disabled
              style={{ cursor: 'not-allowed' }} // Optional, if you'd like to directly add inline style
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
  );
};

<section>
<div className="absolute right-0 top-0 z-[-1] opacity-30 lg:opacity-100">
          <svg
            width="450"
            height="556"
            viewBox="0 0 450 556"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="277"
              cy="63"
              r="225"
              fill="url(#paint0_linear_25:217)"
            />
            <circle
              cx="17.9997"
              cy="182"
              r="18"
              fill="url(#paint1_radial_25:217)"
            />
            <circle
              cx="76.9997"
              cy="288"
              r="34"
              fill="url(#paint2_radial_25:217)"
            />
            <circle
              cx="325.486"
              cy="302.87"
              r="180"
              transform="rotate(-37.6852 325.486 302.87)"
              fill="url(#paint3_linear_25:217)"
            />
            <circle
              opacity="0.8"
              cx="184.521"
              cy="315.521"
              r="132.862"
              transform="rotate(114.874 184.521 315.521)"
              stroke="url(#paint4_linear_25:217)"
            />
            <circle
              opacity="0.8"
              cx="356"
              cy="290"
              r="179.5"
              transform="rotate(-30 356 290)"
              stroke="url(#paint5_linear_25:217)"
            />
            <circle
              opacity="0.8"
              cx="191.659"
              cy="302.659"
              r="133.362"
              transform="rotate(133.319 191.659 302.659)"
              fill="url(#paint6_linear_25:217)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_25:217"
                x1="-54.5003"
                y1="-178"
                x2="222"
                y2="288"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <radialGradient
                id="paint1_radial_25:217"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(17.9997 182) rotate(90) scale(18)"
              >
                <stop offset="0.145833" stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.08" />
              </radialGradient>
              <radialGradient
                id="paint2_radial_25:217"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(76.9997 288) rotate(90) scale(34)"
              >
                <stop offset="0.145833" stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.08" />
              </radialGradient>
              <linearGradient
                id="paint3_linear_25:217"
                x1="226.775"
                y1="-66.1548"
                x2="292.157"
                y2="351.421"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint4_linear_25:217"
                x1="184.521"
                y1="182.159"
                x2="184.521"
                y2="448.882"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint5_linear_25:217"
                x1="356"
                y1="110"
                x2="356"
                y2="470"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint6_linear_25:217"
                x1="118.524"
                y1="29.2497"
                x2="166.965"
                y2="338.63"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 z-[-1] opacity-30 lg:opacity-100">
        <svg
          width="364"
          height="201"
          viewBox="0 0 364 201"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.88928 72.3303C33.6599 66.4798 101.397 64.9086 150.178 105.427C211.155 156.076 229.59 162.093 264.333 166.607C299.076 171.12 337.718 183.657 362.889 212.24"
            stroke="url(#paint0_linear_25:218)"
          />
          <path
            d="M-22.1107 72.3303C5.65989 66.4798 73.3965 64.9086 122.178 105.427C183.155 156.076 201.59 162.093 236.333 166.607C271.076 171.12 309.718 183.657 334.889 212.24"
            stroke="url(#paint1_linear_25:218)"
          />
          <path
            d="M-53.1107 72.3303C-25.3401 66.4798 42.3965 64.9086 91.1783 105.427C152.155 156.076 170.59 162.093 205.333 166.607C240.076 171.12 278.718 183.657 303.889 212.24"
            stroke="url(#paint2_linear_25:218)"
          />
          <path
            d="M-98.1618 65.0889C-68.1416 60.0601 4.73364 60.4882 56.0734 102.431C120.248 154.86 139.905 161.419 177.137 166.956C214.37 172.493 255.575 186.165 281.856 215.481"
            stroke="url(#paint3_linear_25:218)"
          />
          <circle
            opacity="0.8"
            cx="214.505"
            cy="60.5054"
            r="49.7205"
            transform="rotate(-13.421 214.505 60.5054)"
            stroke="url(#paint4_linear_25:218)"
          />
          <circle cx="220" cy="63" r="43" fill="url(#paint5_radial_25:218)" />
          <defs>
            <linearGradient
              id="paint0_linear_25:218"
              x1="184.389"
              y1="69.2405"
              x2="184.389"
              y2="212.24"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" stopOpacity="0" />
              <stop offset="1" stopColor="#4A6CF7" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_25:218"
              x1="156.389"
              y1="69.2405"
              x2="156.389"
              y2="212.24"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" stopOpacity="0" />
              <stop offset="1" stopColor="#4A6CF7" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_25:218"
              x1="125.389"
              y1="69.2405"
              x2="125.389"
              y2="212.24"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" stopOpacity="0" />
              <stop offset="1" stopColor="#4A6CF7" />
            </linearGradient>
            <linearGradient
              id="paint3_linear_25:218"
              x1="93.8507"
              y1="67.2674"
              x2="89.9278"
              y2="210.214"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" stopOpacity="0" />
              <stop offset="1" stopColor="#4A6CF7" />
            </linearGradient>
            <linearGradient
              id="paint4_linear_25:218"
              x1="214.505"
              y1="10.2849"
              x2="212.684"
              y2="99.5816"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
            <radialGradient
              id="paint5_radial_25:218"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(220 63) rotate(90) scale(43)"
            >
              <stop offset="0.145833" stopColor="white" stopOpacity="0" />
              <stop offset="1" stopColor="white" stopOpacity="0.08" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      </section> 
export default CheckoutPage;
