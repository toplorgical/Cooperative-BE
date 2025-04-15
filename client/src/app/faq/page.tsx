import FAQ from "@/components/FAQ";
import Footer from "@/components/footer";
import Header from "@/components/header";
import React from "react";

const Page = () => {
  return (
    <div>
      <div className="bg-[#e5f5fd] min-h-[50vh]">
        <Header />
        <div className="text-center text-4xl font-bold py-[7rem]">FAQ</div>
      </div>
      <FAQ />
      <Footer />
    </div>
  );
};

export default Page;
