'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';
import CustomAlert from './CustomAlert';
import expertsData from '@/data/expertsData';

console.log('ConsultForm Component Mounted');

const ConsultForm = ({ selectedExpert }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Fetch expert ID and name from URL parameters
  const expertId = searchParams.get('expertId');
  const expertName = searchParams.get('expertName');
  
  // State declarations
  const [expert, setExpert] = useState(selectedExpert || null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [alert, setAlert] = useState(null);
  
  // Predefined time slots
  const timeSlots = [
    { label: '10:00 AM', value: '10:00' },
    { label: '2:00 PM', value: '14:00' },
    { label: '5:00 PM', value: '17:00' },
    { label: '8:00 PM', value: '20:00' },
  ];
  
  // Fetch expert details if expertId is available and no selectedExpert is provided
  useEffect(() => {
    console.log('Running useEffect with expertId:', expertId);
    if (expertId && !selectedExpert) {
      const fetchedExpert = expertsData.find((e) => e.id === expertId);
      if (fetchedExpert) {
        console.log('Fetched Expert:', fetchedExpert);
        setExpert(fetchedExpert);
      } else {
        console.log('Expert not found with ID:', expertId);
      }
    } else if (selectedExpert) {
      setExpert(selectedExpert);
    }
    console.log('Current expert state after useEffect:', expert);
  }, [expertId, selectedExpert]);
  
  // Handle date selection from calendar
  const handleDateChange = (date) => {
    console.log('Selected Date:', date);
    setSelectedDate(date);
    setIsCalendarVisible(false);
  };
  
  // Handle time slot selection
  const handleTimeSlotSelect = (value) => {
    console.log('Selected Time Slot:', value);
    setSelectedTimeSlot(value);
  };
  
  // Handle proceeding to checkout
  const handleProceedToCheckout = () => {
    if (expert && selectedDate && selectedTimeSlot) {
      console.log('Proceeding with Checkout:', {
        expertId: expert.id,
        date: format(selectedDate, 'dd/MM/yyyy'),
        time: selectedTimeSlot,
      });
      router.push(
        `/Checkout?expertId=${expert.id}&date=${encodeURIComponent(
          format(selectedDate, 'dd/MM/yyyy')
        )}&time=${selectedTimeSlot}`
      );
    } else {
      setAlert({
        message: 'Please select a date, time, and time slot.',
        type: 'error',
      });
      console.log('Error: Missing required fields.');
    }
  };

  if (!expert) {
    return <p style={{ marginTop: '200px', marginBottom: '200px', textAlign: 'center' }}>Loading expert information...</p>;
  }

  return (
    <div className="consult-form-wrapper" style={{ backgroundColor: 'transparent' }}>
      <div className="consult-form-container mx-auto p-6 max-w-lg rounded-lg shadow-md">
        {alert && (
          <CustomAlert
            message={alert.message}
            type={alert.type}
            onClose={() => setAlert(null)}
          />
        )}
        
        {/* Expert Details Section */}
        <div className="text-center mb-8">
          <img
            src={expert.photo}
            alt={expert.name}
            className="w-40 h-40 rounded-full object-cover mx-auto border-4 border-primary"
          />
          <h2 className="text-3xl font-semibold mt-4">{expert.name}</h2>
          <p className="text-xl text-gray-600">{expert.expertise}</p>
        </div>
        
        {/* Date Selection */}
        <h4>Select a Date</h4>
        <div className="relative mb-6">
          <input
            type="text"
            value={selectedDate ? format(selectedDate, 'dd/MM/yyyy') : ''}
            onFocus={() => setIsCalendarVisible(true)}
            className="datetime-input p-2 w-full border border-gray-300 rounded-md"
            readOnly
            placeholder='Select a date'
          />
          <span
            className="calendar-icon absolute right-3 top-3 cursor-pointer"
            onClick={() => setIsCalendarVisible(!isCalendarVisible)}
          >
            📅
          </span>
          {isCalendarVisible && (
            <div className="calendar-popup absolute">
              <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                minDate={new Date()}
                maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
                tileDisabled={({ date }) => date.getDay() === 0}
                showNeighboringMonth={false}
                calendarType="iso8601"
              />
            </div>
          )}
        </div>
        
        {/* Time Slot Selection */}
        <h4>Select a Time Slot</h4>
        <div className="time-slot-buttons flex justify-center space-x-4">
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
        
        {/* Proceed Button */}
        <div className="text-center">
          <button onClick={handleProceedToCheckout} className="btn btn-primary p-3 px-6 rounded-md bg-blue-500 text-white">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsultForm;
