import Image from "next/image";
import React from "react";
import { SlBadge } from "react-icons/sl";

const WhyUsSection = () => {
  return (
    <section className="pb-10">
  <div className="container px-4 py-20 mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="col-span-1">
        <div className="font-medium border-b-4 border-b-[#00a3f5] max-w-fit text-lg mb-5">Why Choose Us</div>
        <h3 className="text-3xl md:text-4xl font-bold mb-16">We Will Give You The Best Service</h3>
        <div className="flex gap-4 mb-16">
          <div className="w-10 h-10 md:w-12 md:h-12 flex flex-shrink-0 justify-center items-center border--2 font-bold text-xl md:text-2xl rounded-full border-[#00a3f5] border-solid text-[#00a3f5]">
            1
          </div>
          <div>
            <div className="mb-3 md:mb-5 text-blue-900 text-xl md:text-2xl">Diverse Membership</div>
            <div className="text-gray-500">
              Our membership is populated by workers and small & medium-sized businesses.
            </div>
          </div>
        </div>
        <div className="flex gap-4 mb-10">
          <div className="w-10 h-10 md:w-12 md:h-12 flex flex-shrink-0 justify-center items-center border--2 font-bold text-xl md:text-2xl rounded-full border-[#00a3f5] border-solid text-[#00a3f5]">
            2
          </div>
          <div>
            <div className="mb-3 md:mb-5 text-blue-900 text-xl md:text-2xl">Secure & Reliable Service</div>
            <div className="text-gray-500">
              Secure and reliably run society. Regulated by the state and cooperative societies.
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center md:justify-end col-span-1 relative">
        <Image
          width={0}
          height={0}
          alt="Create an account"
          src="/assets/img-2.png"
          sizes="100vw"
          className="w-full object-cover rounded-3xl max-w-[300px] md:max-w-[400px] max-h-[300px] md:max-h-[400px]"
        />
        <Image
          width={0}
          height={0}
          alt="Create an account"
          src="/assets/img-1.png"
          sizes="100vw"
          className="w-full object-cover rounded-3xl max-w-[200px] md:max-w-[300px] h-auto absolute bottom-[-50px] md:bottom-[-70px] left-0"
        />
        <div
          style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}
          className="bg-white p-3 flex items-center gap-4 absolute top-[70px] md:top-[100px] left-[15px] md:left-[30px] rounded-xl"
        >
          <div>
            <div className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-full bg-[#00a3f5] flex justify-center items-center">
              <SlBadge className="fill-white w-6 h-6 md:w-8 md:h-8" />
            </div>
          </div>
          <div>
            <div className="text-lg md:text-xl font-medium">33+</div>
            <div>Years of Experience</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

  );
};

export default WhyUsSection;
