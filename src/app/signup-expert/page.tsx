'use client';
import Breadcrumb from "@/components/Common/Breadcrumb";
import OnboardingExpertForm from "@/components/signup-expert";
import { useEffect } from "react";


const OnboardingExpert = () => {
  useEffect(() => {
    document.title = "On Boarding - AeroCOG";
  }, []);

  return (
    <>
      <Breadcrumb
      pageName="Become an Expert"
      description="Join our team of experts and help us build a better world."
      />
      <OnboardingExpertForm />
      
    </>
  );
};

export default OnboardingExpert;
