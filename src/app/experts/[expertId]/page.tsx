'use client';
import { useRouter } from 'next/navigation';
import expertsData from '@/data/expertsData'; // Import expert data
import Image from 'next/image';
import Breadcrumb from '@/components/Common/Breadcrumb';


const ExpertDetailPage = ({ params }) => {
  const pageName = "Details of Experts";
  const description = "Review your consultation details and complete the booking process. Our experts are here to help you with their extensive knowledge and experience.";
  const { expertId,} = params; // Get expertId from URL params
  
  const router = useRouter();
  
  // Find the expert data based on the expertId from the URL
  const expert = expertsData.find((e) => e.id === expertId);
  
  if (!expert) {
    return <div style={{ marginTop: '200px', marginBottom: '200px', textAlign: 'center' }}>Expert not found</div>; // Handle invalid expert ID
  }
  
  const handleConsult = () => {
    // Redirect to the consult page with the expertId
    router.push(`/consult?expertId=${expert.id}&expertName=${expert.name}`);
  };

  return (
    <>
    <Breadcrumb pageName={pageName} description={description} />
      <header />
      <section className="py-20 px-4" style={{ marginBottom: '50px', backgroundColor: 'transparent'}}>
        <div className="container mx-auto" >
          <div className="flex flex-col items-center space-y-8">
            {/* Profile Picture */}
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-primary">
              <Image src={expert.photo} alt={expert.name} width={160} height={160} />
            </div>

            {/* Expert Information */}
            <div className="text-center">
              <h2 className="text-2xl font-bold">{expert.name}</h2>
              <p className="text-lg font-medium text-gray-600">{expert.designation}</p>
              <p className="text-base text-gray-500 mt-2">{expert.shortIntro}</p>
            </div>

            {/* Notable Projects and Social Links */}
            <div className="flex justify-center gap-8 mt-6">
              <div>
                <h3 className="font-bold">Notable Projects</h3>
                <ul>
                  {expert.notableProjects.map((project, index) => (
                    <li key={index}>
                      <a href={project.link} className="text-blue-500">{project.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-bold">Social Links</h3>
                <ul>
                  {expert.socialLinks.map((social, index) => (
                    <li key={index}>
                      <a href={social.link} className="text-blue-500">{social.platform}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Expert Biography */}
            <div className="mt-8 text-center max-w-2xl mx-auto">
              <p>{expert.bio}</p>
            </div>

            {/* Consult Button */}
            <div className="mt-8">
              <button
                onClick={handleConsult}
                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition duration-300"
              >
                Consult {expert.name}
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer />
    </>
  );
};

export default ExpertDetailPage;
