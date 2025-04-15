"use client";

import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import AboutSection from "@/components/about-section";
import FeaturesSection from "@/components/features-section";
import HowItWorkSection from "@/components/how-it-works";

const AboutUsModule = () => {
  return (
    <div>
      <div className="bg-[#e5f5fd] min-h-[50vh]">
        <Header />
        <div className="text-center text-4xl font-bold py-[7rem]">About</div>
      </div>
      <AboutSection />
      <FeaturesSection />
      <HowItWorkSection />
      <Footer />
    </div>
  );
};

export default AboutUsModule;