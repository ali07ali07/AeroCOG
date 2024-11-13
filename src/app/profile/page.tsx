"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from './profile.module.css';
import Breadcrumb from '../../components/Common/Breadcrumb';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../components/firebase"; 
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../components/firebase"; 

const Profile = () => {
  const pageName = "Profile";
  const description = "";
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const [activeTab, setActiveTab] = useState<string>("profile");
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loadingAppointments, setLoadingAppointments] = useState<boolean>(true);

  // Fetch appointment history
  useEffect(() => {
    const fetchAppointmentHistory = async () => {
      if (!user) return;
      
      const q = query(
        collection(db, "appointments"),
        where("userEmail", "==", user.email)
      );

      try {
        const querySnapshot = await getDocs(q);
        const appointmentsList = querySnapshot.docs.map((doc) => doc.data());
        setAppointments(appointmentsList);
      } catch (error) {
        console.error("Error fetching appointment history:", error);
      } finally {
        setLoadingAppointments(false);
      }
    };

    fetchAppointmentHistory();
  }, [user]);

  const handlePasswordReset = async () => {
    if (user?.email) {
      try {
        await sendPasswordResetEmail(auth, user.email);
        alert("Password reset email sent successfully.");
      } catch (error) {
        console.error("Error sending password reset email: ", error);
        setError("Failed to send reset email. Please try again.");
      }
    } else {
      setError("User email not found.");
    }
  };

  useEffect(() => {
    document.title = "User Profile - AeroCOG";
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setError("No user found.");
        setLoading(false);
        router.push("/signin");
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p style={{ marginTop: '200px', marginBottom: '200px', textAlign: 'center' }}>Loading...</p>;

  if (error) return <p>{error}</p>;

  const handleSignOut = () => {
    auth.signOut();
  };

  return (
    <>
      <Breadcrumb pageName={pageName} description={description} />
      <div className={styles.profileContainer}>
        {/* Tab Navigation */}
        <div className={styles.tabs}>
          <button
            className={activeTab === "profile" ? styles.activeTab : ""}
            onClick={() => setActiveTab("profile")}
          >
            My Profile
          </button>
          <button
            className={activeTab === "appointments" ? styles.activeTab : ""}
            onClick={() => setActiveTab("appointments")}
          >
            My Appointments
          </button>
        </div>

        {/* "My Profile" Tab */}
        {activeTab === "profile" && (
          <div className={styles.profileContent}>
            <h2 className={styles.profileHeader}>User Profile</h2>
            <div className={styles.info}>
              <span className={styles.infoLabel}>Name:</span> {user?.displayName || "N/A"}
            </div>
            <div className={styles.info}>
              <span className={styles.infoLabel}>Email:</span> {user?.email || "N/A"}
            </div>
            <button onClick={handlePasswordReset} className={styles.resetButton}>
              Reset Password
            </button>
            <div className={styles.info} id="login">
              <br />
              <span className={styles.infoLogin}>Last Login: </span>
              {user?.metadata?.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleString() : "N/A"}
            </div>

            <button onClick={handleSignOut} className={styles.signOutButton}>
              Sign Out
            </button>
          </div>
        )}

        {/* "My Appointments" Tab */}
        {activeTab === "appointments" && (
          <div className={styles.appointmentsContent}>
            <h3>Booking History</h3>
            {loadingAppointments ? (
              <p>Loading booking history...</p>
            ) : (
              <ul className={styles.bookingList}>
                {appointments.length > 0 ? (
                  appointments.map((appointment, index) => (
                    <li key={index} className={styles.bookingItem}>
                      <span>Appointment with: {appointment.expertName || "Not Available"}</span>
                      <span>Time: {appointment.time || "Not Available"}</span>
                      <span>Date: {appointment.date ? new Date(appointment.date.seconds * 1000).toLocaleDateString() : "Not Available"}</span>
                      <span>Status: {appointment.status || "N/A"}</span>
                    </li>
                  ))
                ) : (
                  <p style={{color: 'red', fontWeight: "bold"}}>No appointments found.</p>
                )}
              </ul>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
