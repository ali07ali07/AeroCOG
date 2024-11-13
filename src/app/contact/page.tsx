'use client';
import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";
import { useEffect } from "react";


const ContactPage = () => {
  useEffect(() => {
    document.title = "Contact - AeroCOG";
  }, []);

  return (
    <>
      <Breadcrumb
      pageName="Get in Touch"
      description="Feel free to reach out to us with any questions or concerns. We're here to help!"
      />

      <Contact />
    </>
  );
};

export default ContactPage;
