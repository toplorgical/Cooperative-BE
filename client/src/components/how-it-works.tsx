import React from "react";

const HowItWorkSection = () => {
  return (
    <section>
      <div className="container px-4 py-20 mx-auto">
        <div className="font-medium text-lg mb-5 text-center">
          <span className="border-b-4 border-b-[#00a3f5]">How It Works</span>
        </div>
        <h3 className="text-4xl font-bold mb-16 text-center">It&apos;s Easy To Join</h3>

        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-4 md:col-span-2 lg:col-span-1">
            <div className="p-4 py-6 bg-white rounded h-full">
              <div className="flex justify-center mb-5">
                <div className="w-[80px] h-[80px] rounded-full bg-[#fafafa] text-[#00a3f5] hover:bg-[#00a3f5] hover:text-[#fafafa] flex justify-center items-center transition">
                  <span className="text-3xl">1</span>
                </div>
              </div>
              <div className="text-center mb-5 text-2xl font-semibold">Be a Member!</div>
              <div className="text-center text-gray-500 mb-4">
                To be a member, you have to complete a membership application form.
              </div>
            </div>
          </div>
          <div className="col-span-4 md:col-span-2 lg:col-span-1">
            <div className="p-4 py-6 bg-white rounded h-full">
              <div className="flex justify-center mb-5">
                <div className="w-[80px] h-[80px] rounded-full bg-[#fafafa] text-[#00a3f5] hover:bg-[#00a3f5] hover:text-[#fafafa] flex justify-center items-center transition">
                  <span className="text-3xl">2</span>
                </div>
              </div>
              <div className="text-center mb-5 text-2xl font-semibold">Verification</div>
              <div className="text-center text-gray-500 mb-4">
                After registration you need to verify your Email and Mobile Number.
              </div>
            </div>
          </div>
          <div className="col-span-4 md:col-span-2 lg:col-span-1">
            <div className="p-4 py-6 bg-white rounded h-full">
              <div className="flex justify-center mb-5">
                <div className="w-[80px] h-[80px] rounded-full bg-[#fafafa] text-[#00a3f5] hover:bg-[#00a3f5] hover:text-[#fafafa] flex justify-center items-center transition">
                  <span className="text-3xl">3</span>
                </div>
              </div>
              <div className="text-center mb-5 text-2xl font-semibold">Direct PAYE Deposit</div>
              <div className="text-center text-gray-500 mb-4">
                Your deposit comes as a direct debit from your salary before applying to any FDR or DPS plans.
              </div>
            </div>
          </div>
          <div className="col-span-4 md:col-span-2 lg:col-span-1">
            <div className="p-4 py-6 bg-white rounded h-full">
              <div className="flex justify-center mb-5">
                <div className="w-[80px] h-[80px] rounded-full bg-[#fafafa] text-[#00a3f5] hover:bg-[#00a3f5] hover:text-[#fafafa] flex justify-center items-center transition">
                  <span className="text-3xl">4</span>
                </div>
              </div>
              <div className="text-center mb-5 text-2xl font-semibold">Enjoy all Benefits</div>
              <div className="text-center text-gray-500 mb-4">
                Now you can enjoy all membership benefits as a registered member account holder.{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorkSection;
