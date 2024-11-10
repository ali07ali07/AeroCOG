'use client'; 
import { useState, useEffect } from 'react'; 
import { useRouter, useSearchParams } from 'next/navigation';
import Calendar from 'react-calendar'; // Import react-calendar
import 'react-calendar/dist/Calendar.css'; // Import default styling
import { format } from 'date-fns'; // Import date-fns for formatting
import CustomAlert from './CustomAlert'; // Assuming your custom alert component

const ConsultForm = ({ selectedExpert }) => {
  
  const router = useRouter();
  const searchParams = useSearchParams(); 
  const expertId = searchParams.get('expertId'); 
  const [expert, setExpert] = useState(selectedExpert || null);
  const [selectedDate, setSelectedDate] = useState(null); // Make selectedDate a Date object
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [isCalendarVisible, setIsCalendarVisible] = useState(false); // To control calendar visibility
  const [alert, setAlert] = useState(null); // State for custom alert
  
  // Predefined time slots as an array
  const timeSlots = [
    { label: '10:00 AM', value: '10:00' },
    { label: '2:00 PM', value: '14:00' },
    { label: '5:00 PM', value: '17:00' },
    { label: '8:00 PM', value: '20:00' },
  ];
  
  const experts = [
    { id: '1', name: 'Dr. John Doe', expertise: 'Aerospace Engineer' },
    { id: '2', name: 'Dr. Jane Smith', expertise: 'Aerospace Researcher' },
    { id: '3', name: 'Dr. Alice Brown', expertise: 'Satellite Engineer' },
  ];

  useEffect(() => {
    if (!selectedExpert && expertId && !expert) {
      const fetchedExpert = experts.find((e) => e.id === expertId);
      if (fetchedExpert) setExpert(fetchedExpert);
    } else if (selectedExpert) {
      setExpert(selectedExpert);
    }
  }, [expertId, selectedExpert, expert]);

  const handleDateChange = (date) => {
    setSelectedDate(date); // Keep selectedDate as a Date object
    setIsCalendarVisible(false); // Close calendar after selecting a date
  };

  const handleTimeSlotSelect = (time) => {
    setSelectedTimeSlot(time); // Set the selected time slot
  };

  const handleProceedToCheckout = () => {
    if (expert && selectedDate && selectedTimeSlot) {
      router.push(
        `/checkout?expertId=${expert.id}&date=${encodeURIComponent(
          format(selectedDate, 'dd/MM/yyyy') // Format date as DD/MM/YYYY
        )}&time=${selectedTimeSlot}`
      );
    } else {
      setAlert({
        message: 'Please select a date, time, and time slot.',
        type: 'error',
      }); // Trigger alert if any of the fields are empty
    }
  };

  if (!expert) {
    return <p>Loading expert information...</p>;
  }

  return (
    <div className="consult-form-wrapper">
      <div className="consult-form-container">
        {alert && (
          <CustomAlert
            message={alert.message}
            type={alert.type}
            onClose={() => setAlert(null)} // Close alert when button is clicked
          />
        )}

        <p className="text-center">Expert: {expert.name}</p>
        <p className="text-center">Expertise: {expert.expertise}</p>

        <h4>Select a Date</h4>
        <div className="relative">
          <input
            type="text"
            value={selectedDate ? format(selectedDate, 'dd/MM/yyyy') : ''} // Format date for display
            onFocus={() => setIsCalendarVisible(true)} // Show calendar on focus
            className="datetime-input"
            readOnly // Make input read-only to trigger calendar on click
          />
          <span
            className="calendar-icon"
            onClick={() => setIsCalendarVisible(!isCalendarVisible)} // Toggle calendar on icon click
          >
            📅
          </span>
          {isCalendarVisible && (
            <div className="calendar-popup">
              <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                minDate={new Date()} // Disable past dates
                maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))} // Allow up to 1 year in advance
                showNeighboringMonth={false} // Hide neighboring months
                calendarType="iso8601" // To make calendar consistent with the modern format
              />
            </div>
          )}
        </div>
        <br />

        <h4>Select a Time Slot</h4>
        <br />
        <div className="time-slot-buttons">
          {timeSlots.map((slot) => (
            <button
              key={slot.value}
              onClick={() => handleTimeSlotSelect(slot.value)}
              className={`time-slot-button ${selectedTimeSlot === slot.value ? 'selected' : ''}`}
            >
              {slot.label}
            </button>
          ))}
        </div>

        <button onClick={handleProceedToCheckout} className="btn btn-primary">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};



export default ConsultForm;
