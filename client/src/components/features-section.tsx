import React from "react";
import { FaWallet } from "react-icons/fa";
import { GrMoney } from "react-icons/gr";
import { LiaExchangeAltSolid } from "react-icons/lia";

const FeaturesSection = () => {
  return (
    <section className="bg-[#fafafa]">
      <div className="container px-4 py-20 mx-auto">
        <div className="font-medium text-lg mb-5 text-center">
          <span className="border-b-4 border-b-[#00a3f5]">Our Features</span>
        </div>
        <h3 className="text-4xl font-bold mb-16 text-center">Explore Our Features</h3>

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-3 md:col-span-1">
            <div className="p-4 py-6 bg-white rounded h-full">
              <div className="flex justify-center mb-5">
                <div className="w-[80px] h-[80px] rounded-full bg-[#fafafa] flex justify-center items-center">
                  <LiaExchangeAltSolid className="fill-[#00a3f5] w-12 h-12" />
                </div>
              </div>
              <div className="text-center mb-5 text-2xl font-semibold">Transfer Money</div>
              <div className="text-center text-gray-500 mb-4">
                You are able to transfer your funds within the Coop account or other banks we support by adding your
                beneficiaries
              </div>
            </div>
          </div>
          <div className="col-span-3 md:col-span-1">
            <div className="p-4 py-6 bg-white rounded h-full">
              <div className="flex justify-center mb-5">
                <div className="w-[80px] h-[80px] rounded-full bg-[#fafafa] flex justify-center items-center">
                  <FaWallet className="fill-[#00a3f5] w-12 h-12" />
                </div>
              </div>
              <div className="text-center mb-5 text-2xl font-semibold">Deposit Schemes</div>
              <div className="text-center text-gray-500 mb-4">
                We have two deposit schemes for you, one is Deposit Pension Scheme and another is the Fixed Deposit
                Receipt.
              </div>
            </div>
          </div>
          <div className="col-span-3 md:col-span-1">
            <div className="p-4 py-6 bg-white rounded h-full">
              <div className="flex justify-center mb-5">
                <div className="w-[80px] h-[80px] rounded-full bg-[#fafafa] flex justify-center items-center">
                  <GrMoney className="text-[#00a3f5] w-12 h-12" />
                </div>
              </div>
              <div className="text-center mb-5 text-2xl font-semibold">Need A Loan?</div>
              <div className="text-center text-gray-500 mb-4">
                image Need A Loan? We have several loan plans. You may apply for any loan by completing the loan
                application form
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
