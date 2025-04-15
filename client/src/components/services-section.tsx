import React from "react";
import { FaCreditCard } from "react-icons/fa";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { PiHandWithdrawFill } from "react-icons/pi";

const ServiceSection = () => {
  return (
    <section
  style={{
    background: "linear-gradient(to right, #fafafa 70%, #00000069 30%), url(/assets/img-3.jpg) right",
    backgroundSize: "contain",
    backgroundPosition: "right",
    backgroundRepeat: "no-repeat",
  }}
>
  <div className="container px-4 py-20 mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="col-span-1">
        <div className="font-medium border-b-4 border-b-[#00a3f5] max-w-fit text-lg mb-5">Services</div>
        <h3 className="text-3xl md:text-4xl font-bold mb-16">We Make Your Life Comfortable With Our Services.</h3>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="col-span-1">
        <div className="p-4 py-6 bg-white rounded h-full">
          <div className="flex justify-center mb-5">
            <div className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] rounded-full bg-[#00a3f5] flex justify-center items-center">
              <PiHandWithdrawFill className="fill-white w-8 h-8 md:w-12 md:h-12" />
            </div>
          </div>
          <div className="text-center mb-5 text-xl md:text-2xl font-semibold">Withdraw Funds</div>
          <div className="text-center text-gray-500 mb-4">Your fund is ready. Withdraw to your account.</div>
        </div>
      </div>
      <div className="col-span-1">
        <div className="p-4 py-6 bg-white rounded h-full">
          <div className="flex justify-center mb-5">
            <div className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] rounded-full bg-[#00a3f5] flex justify-center items-center">
              <FaCreditCard className="fill-white w-8 h-8 md:w-12 md:h-12" />
            </div>
          </div>
          <div className="text-center mb-5 text-xl md:text-2xl font-semibold">Deposit Funds</div>
          <div className="text-center text-gray-500 mb-4">You can make a deposit to top up your account if you need to.</div>
        </div>
      </div>
      <div className="col-span-1">
        <div className="p-4 py-6 bg-white rounded h-full">
          <div className="flex justify-center mb-5">
            <div className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] rounded-full bg-[#00a3f5] flex justify-center items-center">
              <LiaExchangeAltSolid className="fill-white w-8 h-8 md:w-12 md:h-12" />
            </div>
          </div>
          <div className="text-center mb-5 text-xl md:text-2xl font-semibold">Fast Loan?</div>
          <div className="text-center text-gray-500 mb-4">Need a fast loan? Apply via your account.</div>
        </div>
      </div>
    </div>
  </div>
</section>

  );
};

export default ServiceSection;
