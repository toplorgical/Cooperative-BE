import AboutSection from "@/components/about-section";
import FAQ from "@/components/FAQ";
import FeaturesSection from "@/components/features-section";
import Footer from "@/components/footer";
import Header from "@/components/header";
import HowItWorkSection from "@/components/how-it-works";
import ServiceSection from "@/components/services-section";
import WhyUsSection from "@/components/why-us-section";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="bg-[#e5f5fd] min-h-[100vh]">
        <Header />
        <div className="container px-4 py-20 mx-auto">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
    <div className="col-span-1">
      <h1 className="text-4xl md:text-7xl font-bold text-center md:text-left mb-10 md:mb-16">
        Welcome To LSHMB Cooperative Multipurpose Society
      </h1>
      <div className="flex justify-center md:justify-start">
        <Link href="/signup" className="p-3 px-5 rounded-md bg-[#00a3f5] text-white font-medium">
          CREATE AN ACCOUNT
        </Link>
      </div>
    </div>
    <div className="flex justify-center md:justify-end col-span-1">
      <Image
        width={0}
        height={0}
        alt="Create an account"
        src="/assets/loan-img-1-p.jpg"
        sizes="100vw"
        className="w-full rounded-3xl max-w-[300px] md:max-w-[400px] object-cover"
      />
    </div>
  </div>
</div>

      </div>
      <AboutSection />
      <ServiceSection />
      <WhyUsSection />
      <FeaturesSection />
      <HowItWorkSection />
      <FAQ />
      <Footer />
    </div>
  );
}
