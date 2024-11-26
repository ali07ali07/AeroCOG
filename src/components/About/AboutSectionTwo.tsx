import Image from "next/image";
import SEO from ".././Common/SEO";
const AboutSectionTwo = () => {
  return (
    <>
      <SEO
        title="About Page for Aerocog"
        description="This is the about page for Aerocog, Aerocog is an consulting servive provider for aerospace industry"
        keywords="Aerospace, Aerocog, Consulting, Aerospace consulting, Aerocog consulting, Experts, Aerospace experts, Phd experts, Aerospace Phd experts, Aerospace industry, Aerospace industry experts, Aerospace industry consulting, Aerospace industry consulting experts, Aerospace industry consulting services, Aerospace industry consulting services"
      />
      <section className="py-16 md:py-20 lg:py-28">
        <div className="container">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4 lg:w-1/2">
              <div
                className="relative mx-auto mb-12 aspect-[25/24] max-w-[500px] text-center lg:m-0"
                data-wow-delay=".15s"
              >
                <Image
                  src="/images/about/about-image-2.svg"
                  alt="about image"
                  fill
                  className="drop-shadow-three dark:hidden dark:drop-shadow-none"
                />
                <Image
                  src="/images/about/about-image-2-dark.svg"
                  alt="about image"
                  fill
                  className="hidden drop-shadow-three dark:block dark:drop-shadow-none"
                />
              </div>
            </div>
            <div className="w-full px-4 lg:w-1/2">
              <div className="max-w-[470px]">
                <div className="mb-9">
                  <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                    Our Journey!
                  </h3>
                  <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                    AeroCOG was founded in 2022 by <a className="underline decoration-indigo-500 underline-offset-2">Pranav PD</a>  and <a className="underline decoration-indigo-500 underline-offset-2"> Syed Yusuf</a>, with a mission to revolutionize the aerospace industry by connecting aspiring individuals with seasoned experts.
                    Our platform is designed to facilitate meaningful consultations, allowing newcomers to gain invaluable insights and guidance tailored to their unique needs.
                    By fostering a collaborative environment, we aim to empower the next generation of aerospace professionals and enthusiasts to navigate their journeys with confidence and expertise.
                  </p>
                </div>
                <div className="mb-9">
                  <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl relative">
                    Our Vision
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 120 20"
                      className="absolute bottom-[-5px] left-1/2 w-[25%] h-[0.4em] fill-sky-500 -translate-x-1/2"
                      preserveAspectRatio="none"
                    >
                      <path d="M2,18 C30,10 90,10 118,18 L118,20 L2,20 Z" />
                    </svg>
                  </h3>
                  <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                    To be the leading aerospace consultancy firm that bridges the gap between talented aerospace engineers and innovative organizations and startups,
                    fostering a vibrant ecosystem where ideas and expertise converge to drive industry advancements.
                  </p>
                </div>
                <div className="mb-1">
                  <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl relative">
                    Our Mission
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 120 20"
                      className="absolute bottom-[-5px] left-1/2 w-[25%] h-[0.4em] fill-pink-500 -translate-x-1/2"
                      preserveAspectRatio="none"
                    >
                      <path d="M2,18 C30,10 90,10 118,18 L118,20 L2,20 Z" />
                    </svg>
                  </h3>

                  <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                    At AeroCOG, our mission is to connect aerospace engineers with organizations and startups, providing them with the tools,
                    resources, and support needed to thrive in a rapidly evolving industry. We are dedicated to facilitating meaningful collaborations that inspire innovation, enhance knowledge sharing,
                    and empower individuals to contribute to the future of aerospace.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSectionTwo;

