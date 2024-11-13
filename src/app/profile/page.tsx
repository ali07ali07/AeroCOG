"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from './profile.module.css';
import Breadcrumb from '../../components/Common/Breadcrumb';
import { sendPasswordResetEmail } from "firebase/auth";
import { collection, query, where, getDocs, Timestamp } from "firebase/firestore";
import { db, auth } from "../../components/firebase";
import { format } from 'date-fns';

const Profile = () => {
  const pageName = "Profile";
  const description = "";
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<string>("profile"); // Main tab (Profile / Appointments)
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

  // Filter upcoming and previous appointments based on the current date
  const currentDate = new Date();
  const upcomingAppointments = appointments.filter(appointment => {
    const appointmentDate = appointment.date ? new Date(appointment.date.seconds * 1000) : null;
    return appointmentDate && appointmentDate >= currentDate;
  }).sort((a, b) => {
    const dateA = a.date ? new Date(a.date.seconds * 1000) : null;
    const dateB = b.date ? new Date(b.date.seconds * 1000) : null;
    return dateA && dateB ? dateA.getTime() - dateB.getTime() : 0;
  });

  const previousAppointments = appointments.filter(appointment => {
    const appointmentDate = appointment.date ? new Date(appointment.date.seconds * 1000) : null;
    return appointmentDate && appointmentDate < currentDate;
  }).sort((a, b) => {
    const dateA = a.date ? new Date(a.date.seconds * 1000) : null;
    const dateB = b.date ? new Date(b.date.seconds * 1000) : null;
    return dateB && dateA ? dateB.getTime() - dateA.getTime() : 0;
  });

  // Tab rendering
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  if (loadingAppointments) return <p style={{ marginTop: '200px', marginBottom: '200px', textAlign: 'center' }}>Loading appointments...</p>;


  return (
    <>
      <Breadcrumb pageName={pageName} description={description} />


      <div className={styles.profileContainer}>
        {/* Tab Navigation for Profile vs Appointments */}
        <div className={styles.tabs}>
          <button
            className={activeTab === "profile" ? styles.activeTab : ""}
            onClick={() => handleTabClick("profile")}
          >
            My Profile
          </button>
          <button
            className={activeTab === "appointments" ? styles.activeTab : ""}
            onClick={() => handleTabClick("appointments")}
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
            <h3>Appointments</h3>

            {/* Upcoming Appointments */}
            <div>
              <h4>Upcoming Appointments</h4>
              {upcomingAppointments.length > 0 ? (
                <ul>
                  {upcomingAppointments.map((appointment, index) => (
                    <li key={index}>
                      <span>Expert: {appointment.expertName}</span>
                      <span>Time: {appointment.time}</span>
                      <span>Date: {appointment.date ? format(new Date(appointment.date.seconds * 1000), 'dd/MM/yyyy') : "Not Available"}</span>
                      <span>Status: Booked</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No upcoming appointments</p>
              )}
            </div>

          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
