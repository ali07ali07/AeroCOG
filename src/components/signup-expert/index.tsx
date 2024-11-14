"use client";

import { useState } from "react";
import dynamic from 'next/dynamic';

// Dynamically import the component with no SSR to avoid hydration issues

const OnboardingExpertForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    state: "",
    about: "",
    notableProjects: ""
  });

  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // To handle loading state


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true); // Set loading state to true on form submission

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: "bfe432f0-0c6b-4504-a548-bbb052ed1570",
          ...formData,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus("Your message has been sent successfully!");
      } else {
        setStatus("Something went wrong, please try again.");
      }
    } catch (error) {
      setStatus("An error occurred, please try again.");
    } finally {
      setIsSubmitting(false); // Set loading state to false after form submission
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
              <div className="mb-12 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]">
                <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                  Want to become an expert?
                </h2>
                <p className="mb-12 text-base font-medium text-body-color">
                  Fill out the details below and we will get back to you.
                </p>
                <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label htmlFor="name" className="mb-3 block text-sm font-medium text-dark dark:text-white">
                        Your Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                        required
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label htmlFor="email" className="mb-3 block text-sm font-medium text-dark dark:text-white">
                        Your Email
                      </label>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label htmlFor="phone" className="mb-3 block text-sm font-medium text-dark dark:text-white">
                        Your Mobile Number
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your mobile number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label htmlFor="state" className="mb-3 block text-sm font-medium text-dark dark:text-white">
                        State
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="w-full px-4">
                    <div className="mb-8">
                      <label htmlFor="about" className="mb-3 block text-sm font-medium text-dark dark:text-white">
                        About Yourself
                      </label>
                      <textarea
                        name="about"
                        rows={5}
                        value={formData.about}
                        onChange={handleChange}
                        placeholder="Start writing about yourself, your skills and experience, education."
                        className="border-stroke w-full resize-none rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                        required
                      ></textarea>
                    </div>
                  </div>

                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label htmlFor="Notable Projects" className="mb-3 block text-sm font-medium text-dark dark:text-white">
                        Notable Projects
                      </label>
                      <textarea
                        name="Notable Projects"
                        value={formData.notableProjects}
                        onChange={handleChange}
                        placeholder="Start writing about your notable projects."
                        className="border-stroke w-full resize-none rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                        
                      ></textarea>
                    </div>
                  </div>

                  <div className="w-full px-4">
                    <button type="submit" className="rounded-sm bg-primary px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 dark:shadow-submit-dark">
                      Submit Application
                    </button>
                  </div>
                </div>
                {status && <p className="mt-4 text-center text-xl font-semibold">{status}</p>}
              </div>
            </div>
          </div>
        </div>
      </section>
    </form>
  );
};

export default OnboardingExpertForm;
