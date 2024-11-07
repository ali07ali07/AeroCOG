import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Page | AeroCOG",
  description: "This is About Page for AeroCOG",
  keywords: ["AeroCOG", "About", "Aerospace", "Consultations", "Industry Experts"],
    
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="About Page"
        description="AeroCOG is your gateway to the aerospace industry, connecting eager learners with experienced professionals who are passionate about sharing their knowledge.
        Our platform facilitates valuable consultations that empower newcomers to explore their interests, ask questions, and gain insights from experts who have navigated the complexities of aerospace."
      />
      <AboutSectionOne />
      <AboutSectionTwo />
    </>
  );
};

export default AboutPage;
