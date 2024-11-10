'use client';
import { useState, useEffect } from 'react';

const CustomAlert = ({ message, onClose, type = 'info' }) => {
  const alertStyles = {
    info: 'custom-alert-info',
    success: 'custom-alert-success',
    error: 'custom-alert-error',
    warning: 'custom-alert-warning',
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 6000); // Close alert after 3 seconds
    return () => clearTimeout(timer); // Cleanup on unmount
  }, [onClose]);

  return (
    <div
      className={`custom-alert ${alertStyles[type]}`}
      
    >
      <span>{message}</span>
      <button onClick={onClose} className="custom-alert-button">
        Close
      </button>
    </div>
  );
};

export default CustomAlert;
