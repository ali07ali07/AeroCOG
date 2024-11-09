"use client";
import { useEffect, useState } from "react";
import { auth } from "../../components/firebase"; 
import { useRouter } from "next/navigation";
import styles from './profile.module.css';

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setError("No user found.");
        setLoading(false);
        router.push("/signin");  // Redirect to sign-in if no user is authenticated
      }
    });
    

    // Cleanup on unmount
    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;

  const handleSignOut = () => {
    auth.signOut();
  };
  return (
    <div className={styles.profileContainer}>
      {/* Profile section header */}
      <h2 className={styles.profileHeader}>User Profile</h2> 
      
      <div className={styles.info}>
        <span className={styles.infoLabel}>Name:</span> {user?.displayName || "N/A"}
      </div>
      <div className={styles.info}>
        <span className={styles.infoLabel}>Email:</span> {user?.email || "N/A"}
      </div>
      
      <button onClick={handleSignOut} className={styles.signOutButton}>
        Sign Out
      </button>
    </div>
  );
};

export default Profile;