"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { sendPasswordResetEmail, signOut, updateProfile, updateEmail, sendEmailVerification } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../../components/firebase";
import styles from './profile.module.css';
import { format } from 'date-fns';
import Breadcrumb from '../../components/Common/Breadcrumb';
import SEO from '@/components/Common/SEO';

const Profile = () => {
  const pageName = "Profile";
  const description = "";
  const router = useRouter();

  // State for user data and UI handling
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newName, setNewName] = useState<string>(user?.displayName || "");
  const [newEmail, setNewEmail] = useState<string>(user?.email || "");
  const [activeTab, setActiveTab] = useState<string>("profile"); // Main tab (Profile / Appointments)
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);
  const [loadingAppointments, setLoadingAppointments] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);

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
        setNewName(user.displayName || "");
        setNewEmail(user.email || "");

      } else {
        setError("No user found.");
        setLoading(false);
        router.push("/signin");
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p style={{ textAlign: 'center', marginTop: '200px', marginBottom: '200px' }}>Loading...</p>;
  if (error) return <p style={{ textAlign: "center", marginTop: "200px", marginBottom: '200px' }}>{error}</p>;

  const handleSignOut = () => {
    signOut(auth);
    router.push("/");
  };

  // Handle updating user name and email
  const handleUpdateProfile = async () => {
    if (newEmail.trim() === "") {
      setError("Please enter a valid email.");
      return;
    }

    try {
      const validEmail = newEmail.trim();
      const user = auth.currentUser;

      if (user) {
        // Update the name first
        await updateProfile(user, {
          displayName: newName,
        });

        // Send verification email if email is being changed
        if (validEmail !== user.email) {
          await updateEmail(user, validEmail); // Update email
          await sendEmailVerification(user); // Send verification email for new email
          alert("Please verify your new email address.");
        }

        setError(null); // Clear any previous errors
        alert("Profile updated successfully. Please verify your email address.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile. Please : support@aerocog.tech");

    } finally {
      setLoadingUpdate(false);
    }
  };

  // Filter upcoming appointments
  const currentDate = new Date();
  const upcomingAppointments = appointments
    .filter((appointment) => {
      let appointmentDate;
      if (appointment.date?.seconds) {
        appointmentDate = new Date(appointment.date.seconds * 1000);
      } else if (typeof appointment.date === "string") {
        appointmentDate = new Date(appointment.date);
      } else {
        return false;
      }
      return appointmentDate >= currentDate;
    })
    .sort((a, b) => {
      const dateA = a.date.seconds ? new Date(a.date.seconds * 1000) : new Date(a.date);
      const dateB = b.date.seconds ? new Date(b.date.seconds * 1000) : new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    });

  // Handle tab selection
  const handleTabClick = (tab: string) => setActiveTab(tab);

  return (
    <>
      <SEO
        title="User Profile - AeroCOG"
        description="User profile page for AeroCOG"
        keywords="AeroCOG, User Profile, Profile, Appointments, check your upcomming appointments, update your profile, reset password, and more, Aerocog"
      />
      <div className={styles.profileContainer}>
        <Breadcrumb pageName={pageName} description={description} />


        {/* Tab  */}
        <div className={styles.tabs}>
          <button
            onClick={() => handleTabClick("profile")}
            className={activeTab === "profile" ? styles.activeTab : styles.inactiveTab}

          >
            My Profile
          </button>
          <button
            onClick={() => handleTabClick("appointments")}
            className={activeTab === "appointments" ? styles.activeTab : styles.inactiveTab}

          >
            My Appointments
          </button>
        </div>

        {/* "My Profile" Tab */}

        {activeTab === "profile" && (
          <div className={styles.profileContent}>
            <h2>Profile Information</h2>
            <br />
            <div>
              {!isEditing ? (
                <>
                  <p><strong>Name:</strong> {user.displayName}</p>
                  <br />
                  <p><strong>Email:</strong> {user.email}</p>
                  <br />
                  <button
                    onClick={() => setIsEditing(true)}
                    className={styles.editButton}
                  >
                    Edit Profile ?
                  </button>
                </>
              ) : (
                <>
                  <label htmlFor="name">Name:</label>
                  <input
                    id="name"
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className={styles.inputField}
                  />
                  <label htmlFor="email">Email:</label>
                  <input
                    id="email"
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className={styles.inputField}
                  />
                  <button
                    onClick={handleUpdateProfile}
                    disabled={loadingUpdate}
                    className={styles.updateButton}
                  >
                    {loadingUpdate ? "Updating..." : "Update Profile"}
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className={styles.cancelButton}
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>

            <button onClick={handlePasswordReset} className={styles.resetButton}>
              Reset Password
            </button>
            <div className={styles.info} id="login">
              <br />
              <span className={styles.infoLabel}>Last Login:</span>
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
            <h2 className={styles.appointmentsHeader}>Appointments</h2>

            {/* Upcoming Appointments */}
            <div className={styles.upcomingSection}>
              <h4 className={styles.sectionTitle}>Upcoming Appointments</h4>

              {upcomingAppointments.length > 0 ? (
                <div className={styles.bookingGrid}>
                  {upcomingAppointments.map((appointment, index) => (
                    <li key={index} className={styles.bookingItem}>
                      <span className={styles.bookingDetail}>Expert: {appointment.expertName || "N/A"}</span>
                      <span className={styles.bookingDetail}>Time: {appointment.time || "N/A"}</span>
                      <span className={styles.bookingDetail}>
                        Date: {appointment.date
                          ? typeof appointment.date === 'object' && appointment.date.seconds
                            ? format(new Date(appointment.date.seconds * 1000), 'dd/MM/yyyy')
                            : format(new Date(appointment.date), 'dd/MM/yyyy')
                          : "Not Available"}
                      </span>
                      <span className={styles.statusBooked}>Status: Booked</span>
                    </li>
                  ))}
                </div>
              ) : (
                <p className={styles.noAppointments}>No upcoming appointments</p>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );

};

export default Profile;
