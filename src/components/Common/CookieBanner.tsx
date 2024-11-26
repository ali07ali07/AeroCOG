"use client";
import { useState, useEffect  } from "react";


const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if consent has already been given
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    // Handle accept logic here
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
  };

  const handleCancel = () => {
    // Handle decline logic here
    localStorage.setItem("cookieConsent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null; // Don't render the banner if not visible
  
  const handleRevoke = () => {
    localStorage.removeItem("cookieConsent");
    setIsVisible(true);
  };

  return (
    <div>
      {/* Cookie Banner */}
      <div
        className={`cookie-banner ${!isVisible ? "hidden" : ""}`}
        style={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          zIndex: 1000,
        }}
      >
        <p>
          We use cookies to ensure you get the best experience on our website.
          Learn more in our <a href="/_docs/privacy-policy.html" target="_blank" className="underline decoration-indigo-500 underline-offset-2">Privacy Policy</a>.
        </p>
        <div>
          <button
            onClick={handleAccept}
            style={{ marginRight: "15px" }}
            className="text-primary hover:underline underline-offset-2"
          >
            Accept
          </button>
          <button
            onClick={handleCancel}
            className="text-red-400 hover:underline underline-offset-2"
          >
            Decline
          </button>
        </div>
      </div>

      {/* Revoke Consent Button */}
      {!isVisible && (
        <div className="fixed bottom-4 right-4">
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded"
            onClick={handleRevoke}
          >
            Revoke Consent
          </button>
        </div>
      )}
    </div>
  );
};

export default CookieBanner;
