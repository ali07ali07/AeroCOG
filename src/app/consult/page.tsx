'use client';
import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Breadcrumb from '../../components/Common/Breadcrumb';
import 'firebase/auth';
import { auth, onAuthStateChanged } from '../../components/firebase';
import Header from '../../components/Header';
import ExpertsPage from '../experts/page';
import dynamic from 'next/dynamic'; // Import dynamic for lazy loading
import expertsData from '@/data/expertsData';

// Dynamically import ConsultForm so it's only loaded on the client side
const ConsultForm = dynamic(() => import('@/components/ConsultForm'), {
  suspense: true, // Use suspense for dynamic loading
  ssr: false, // Disable SSR for this component
});

const ConsultPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedExpert, setSelectedExpert] = useState(null);
  const expertId = searchParams.get('expertId');
  const expertName = searchParams.get('expertName');

  useEffect(() => {
    if (expertId) {
      const expertDetails = expertsData.find((e) => e.id === expertId);
      setSelectedExpert(expertDetails || { id: expertId, name: expertName });
    } else {
      router.push('/experts'); // Redirect if no expert selected
    }
  }, [expertId, expertName, router]);

  if (!selectedExpert) {
    return <p style={{ marginTop: '200px', marginBottom: '200px', textAlign: 'center' }}>Loading expert details...</p>;
  }

  return (
    <div>
      {/* Render the expert details or consult form */}
      <ConsultForm selectedExpert={selectedExpert} />
    </div>
  );
};

const ConsultPage = () => {
  const pageName = "Consultation";
  const description = "Select a date and book your consultation.";
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push('/signup'); // Redirect to login if not authenticated
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return <p style={{ marginTop: '200px', marginBottom: '200px', textAlign: 'center' }}>Loading...</p>;
  }

  if (!user) {
    return null;
  }

  return (
    <div>
      <Header />
      <Breadcrumb pageName={pageName} description={description} />
      <Suspense fallback={<p>Loading consult form...</p>}>
        <ConsultPageContent />
      </Suspense>
    </div>
  );
};

export default ConsultPage;
