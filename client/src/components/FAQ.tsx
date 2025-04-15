"use client";
import Link from "next/link";
import React from "react";
import { PiCaretDownBold, PiCaretUpBold } from "react-icons/pi";

const FAQ = () => {
  const [selected, setSelected] = React.useState(0);
  return (
    <section className="bg-[#fafafa]">
    <div className="container px-4 py-20 mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="col-span-1">
          <div className="font-medium text-lg mb-5">
            <span className="border-b-4 border-b-[#00a3f5]">Frequently Asked Questions</span>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold mb-6 md:mb-10">
            Any Questions? <br />
            Find Here.
          </h3>
          <div className="text-gray-600 mb-6 md:mb-10">
            Can&apos;t find the answer to your question? Just send us a message.
          </div>
          <Link href="/contact-us" className="p-3 px-5 rounded-md bg-[#00a3f5] text-white font-medium inline-block">
            CONTACT US
          </Link>
        </div>
        <div className="col-span-1 lg:col-span-2">
          {faq().map((item, index) => (
            <div
              key={index}
              style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}
              className="mb-5 p-4 md:p-8 rounded-md bg-white flex flex-col gap-4 transition duration-100"
            >
              <div
                className="flex justify-between cursor-pointer items-center"
                tabIndex={1}
                onClick={() => setSelected(selected === index ? -1 : index)}
              >
                <div className="font-medium text-base md:text-lg">{item?.title}</div>
                <div>{selected === index ? <PiCaretUpBold /> : <PiCaretDownBold />}</div>
              </div>
              {selected === index ? <div className="text-gray-600 text-base md:text-lg">{item?.description}</div> : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
  
  );

  function faq() {
    return [
      {
        title: "Is Joining As A Member Free?",
        description: "Yes, we don't take any fees for joining as a member.",
      },
      {
        title: "Is It Possible To Send Money From Account To Any Other Bank?",
        description: "Yes, you can send money from your account to another bank?",
      },
      {
        title: "How To Join As A Member?",
        description:
          "Get the registration form by clicking on the Sing Up button on the top bar. Provide all information and click on the Sign Up button.",
      },
      {
        title: "Does Coop LSHMB Share Our Information For Advertisement?",
        description: "No, we don't provide our account holder's information to any third-party organization",
      },
      {
        title: "How To Take A Loan?",
        description:
          "We have several loan plans. Choose the best plan suitable for you and just click on the Apply Now button and put the amount.",
      },
      {
        title: "How To Open A FDR",
        description:
          "We have several FDR plans. Choose the best plan suitable for you, and just click on the Apply Now button and enter the amount.",
      },
    ];
  }
};

export default FAQ;
