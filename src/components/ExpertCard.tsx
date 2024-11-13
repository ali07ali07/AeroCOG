'use client';
import { useRouter } from "next/navigation";
import Image from "next/image";

const ExpertCard = ({ expert }) => {
  const router = useRouter();
`/experts/${expert.id}`
  const handleSelectExpert = () => {
    // Navigate to the consult page with the selected expert's ID
    router.push(`/consult?expertId=${expert.id}`);
  };

  return (
    <div
      className="expert-card p-6 border rounded-lg shadow-lg hover:shadow-xl cursor-pointer transition duration-300"
      onClick={handleSelectExpert}
    >
      {/* Display Expert Image */}
      <div className="mb-4 w-full h-48 relative">
        <Image
          src={expert.photo}
          alt={`${expert.name}'s photo`}
          layout="fill"
          objectFit="contain" // Adjust this to fit or fill based on design
          className="rounded-md"
        />
      </div>
      
      <h4 className="text-xl font-bold">{expert.name}</h4>
      <p className="text-sm text-gray-600">{expert.expertise}</p>
      <p className="text-sm text-gray-500 mt-2">{expert.bio}</p>
    </div>
  );
};

export { ExpertCard };
