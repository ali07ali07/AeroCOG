import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
//import Blog from "@/components/Blog";
//import Brands from "@/components/Brands";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
//import Pricing from "@/components/Pricing";
//import Testimonials from "@/components/Testimonials";
import Video from "@/components/Video";
import SEO from '@/components/Common/SEO';



export default function Home() {
  return (
    <>
      <SEO
        title="Aerocog - Aerospace Consulting Platform"
        description="Explore expert aerospace consultants at Aerocog, the premier platform for connecting industry specialists and newcomers."
      />
      <ScrollUp />
      <Hero />
      <Features />
      <Video />
      <AboutSectionOne />
      <AboutSectionTwo />
      <Contact />
    </>
  );
}
