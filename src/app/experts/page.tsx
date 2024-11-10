'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { ExpertCard } from "@/components/ExpertCard";
import Breadcrumb from "@/components/Common/Breadcrumb";

interface Expert {
  id: number;
  name: string;
  expertise: string;
  bio: string;
}

interface ExpertsPageProps {
  onSelectExpert?: (expert: Expert) => void; // onSelectExpert is optional
}

const ExpertsPage: React.FC<ExpertsPageProps> = ({ onSelectExpert }) => {
  const router = useRouter();

  const handleSelectExpert = (expert: Expert) => {
    if (onSelectExpert) {
      onSelectExpert(expert); // For use in ConsultPage
    } else {
      router.push(`/consult?expertId=${expert.id}`); // Direct navigation for standalone
    }
  };

  const experts: Expert[] = [
    { id: 1, name: 'Dr. John Doe', expertise: 'Aerospace Engineer', bio: 'Specialist in spacecraft systems and propulsion technologies.' },
    { id: 2, name: 'Dr. Jane Smith', expertise: 'Aerospace Researcher', bio: 'Expert in aerodynamics and high-performance materials.' },
    { id: 3, name: 'Dr. Alice Brown', expertise: 'Satellite Engineer', bio: 'Focused on satellite communications and design.' },
  ];

  return (
    <>
      <Breadcrumb
        pageName="Our Experts"
        description="Connect with top aerospace professionals ready to bring their knowledge and expertise to your projects."
      />
      <section className="pb-[120px] pt-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            {experts.map((expert) => (
              <div
                key={expert.id}
                className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3"
                onClick={() => handleSelectExpert(expert)} // Universal handler
              >
                <ExpertCard expert={expert} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ExpertsPage;
