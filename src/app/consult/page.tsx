'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Breadcrumb from '../../components/Common/Breadcrumb';
import 'firebase/auth';
import { auth, onAuthStateChanged } from '../../components/firebase';
import Header from '../../components/Header';
import ExpertsPage from '../experts/page';
import ConsultForm from '@/components/ConsultForm';
import expertsData from '@/data/expertsData'; // Importing expert data

const ConsultPage = () => {
  const pageName = "Consultation";
  const description = "Select a date and book your consultation.";
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedExpert, setSelectedExpert] = useState(null); // Updated to store full expert object
  const expertId = searchParams.get('expertId');
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        // Load expert data if expertId is available
        if (expertId) {
          const expertDetails = expertsData.find((e) => e.id === expertId);
          if (expertDetails) {
            setSelectedExpert(expertDetails); // Set the full expert object
          } else {
            router.push('/experts'); // Redirect if expertId is invalid
          }
        } else {
          router.push('/experts'); // Redirect if no expertId in URL
        }
      } else {
        router.push('/signup'); // Redirect to login if not authenticated
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router, searchParams, expertId]);

  if (loading) {
    return <p style={{ marginTop: '200px', marginBottom: '200px', textAlign: 'center' }}>Loading...</p>;
  }

  if (!user) {
    return null;
  }

  // If selectedExpert exists, render ConsultForm with full expert details
  if (selectedExpert) {
    return (
      <div>
        <Header />
        <Breadcrumb pageName={pageName} description={description} />
        <ConsultForm selectedExpert={selectedExpert} />
      </div>
    );
  }

  // Render ExpertsPage if no expert has been selected
  return (
    <>
      <div>
        <Header />
        <ExpertsPage />
      </div>
    </>
  );
};

export default ConsultPage;
