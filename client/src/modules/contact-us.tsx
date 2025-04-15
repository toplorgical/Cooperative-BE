"use client";

import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { FaPhone } from "react-icons/fa";

const ContactUsModule = () => {
  return (
    <div>
      <div className="bg-[#e5f5fd] min-h-[50vh]">
        <Header />
        <div className="text-center text-4xl font-bold py-[7rem]">Contact Us</div>
      </div>
      <section>
        <div className="container px-4 py-20 mx-auto">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-4 md:col-span-2 lg:col-span-1">
              <div className="p-4 py-6 bg-white rounded-md h-full border">
                <div className="flex justify-center mb-5">
                  <div className="w-[80px] h-[80px] rounded-full bg-[#fafafa] text-[#00a3f5] flex justify-center items-center transition">
                    <FaLocationDot className="w-10 h-10 fill-[#00a3f5]" />
                  </div>
                </div>
                <div className="text-center mb-5 text-2xl font-semibold">Office Address</div>
                <div className="text-center text-gray-500 mb-4">PO Box 223158 Oliver Street East Victoria 2006 UK</div>
              </div>
            </div>
            <div className="col-span-4 md:col-span-2 lg:col-span-1">
              <div className="p-4 py-6 bg-white rounded-md h-full border">
                <div className="flex justify-center mb-5">
                  <div className="w-[80px] h-[80px] rounded-full bg-[#fafafa] text-[#00a3f5] flex justify-center items-center transition">
                    <IoMdMail className="w-10 h-10 fill-[#00a3f5]" />
                  </div>
                </div>
                <div className="text-center mb-5 text-2xl font-semibold">Phone Number</div>
                <div className="text-center text-gray-500 mb-4">+44 123 0012 233</div>
              </div>
            </div>
            <div className="col-span-4 md:col-span-2 lg:col-span-1">
              <div className="p-4 py-6 bg-white rounded-md h-full border">
                <div className="flex justify-center mb-5">
                  <div className="w-[80px] h-[80px] rounded-full bg-[#fafafa] text-[#00a3f5] flex justify-center items-center transition">
                    <FaPhone className="w-10 h-10 fill-[#00a3f5]" />
                  </div>
                </div>
                <div className="text-center mb-5 text-2xl font-semibold">Email Address</div>
                <div className="text-center text-gray-500 mb-4">coop.lshmb@lshmb.com</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container px-4 py-20 mx-auto rounded-2xl bg-[#fafafa]">
          <div className="font-medium text-lg mb-5 text-center">
            <span className="border-b-4 border-b-[#00a3f5]">Contact Us</span>
          </div>
          <h3 className="text-4xl font-bold mb-16 text-center">Join Us</h3>
          <form className="px-4">
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div className="col-span-2 md:col-span-1">
                <label htmlFor="name" className="block mb-2 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="block w-full px-4 py-5 rounded-md shadow-sm bg-white border-0 focus:outline-none focus:border-[#00a3f5]"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label htmlFor="email" className="block mb-2 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="block w-full px-4 py-5 rounded-md shadow-sm bg-white border-0 focus:outline-none focus:border-[#00a3f5]"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="mb-8">
              <label htmlFor="subject" className="block mb-2 font-medium">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Enter the subject"
                className="block w-full px-4 py-5 rounded-md shadow-sm bg-white border-0 focus:outline-none focus:border-[#00a3f5]"
                required
              />
            </div>

            <div className="mb-8">
              <label htmlFor="message" className="block mb-2 font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="block w-full px-4 py-5 rounded-md shadow-sm bg-white border-0 focus:outline-none focus:border-[#00a3f5]"
                placeholder="Enter your message"
                required
              ></textarea>
            </div>

            <button type="submit" className="p-3 px-5 rounded-md bg-[#00a3f5] text-white font-medium">
              SEND MESSAGE
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ContactUsModule;
