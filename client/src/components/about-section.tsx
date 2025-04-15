import Image from "next/image";
import React from "react";

const AboutSection = () => {
  return (
    <section>
      <div className="container px-4 py-20 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex justify-center md:justify-start col-span-1">
            <Image
              width={0}
              height={0}
              alt="Create an account"
              src="/assets/img-5.png"
              sizes="100vw"
              className="w-full rounded-3xl max-w-[300px] md:max-w-[400px]"
            />
          </div>
          <div className="col-span-1">
            <div className="font-medium border-b-4 border-b-[#00a3f5] max-w-fit text-lg mb-5">About Us</div>
            <h3 className="text-3xl md:text-4xl font-bold mb-10 md:mb-16">We Care About Your Money And Your Growth.</h3>
            <div className="flex flex-wrap gap-4 mb-4">
              <button className="p-3 px-5 rounded-md bg-[#00a3f5] text-white font-medium">OUR COMMITMENT</button>
              <button className="p-3 px-5 rounded-md bg-[#D9F1FE] font-medium">OUR VALUES</button>
              <button className="p-3 px-5 rounded-md bg-[#D9F1FE] font-medium">OUR MISSION</button>
            </div>
            <div className="text-gray-500">
              We are dedicated to supporting our members through every stage of their financial journey. Whether you are
              looking to save, invest, borrow, or learn more about managing your finances, Cooperative is here to help.
              Our team of experienced professionals is always available to provide personalised assistance and guidance,
              ensuring that you have the resources and support you need to succeed.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
