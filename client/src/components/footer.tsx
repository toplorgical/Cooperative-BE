import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaPhone, FaTwitter } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";

const Footer = () => {
  return (
    <footer className="bg-[#021218]">
      <div className="container px-4 py-20 mx-auto">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 lg:col-span-1">
            <div className="text-white font-semibold text-2xl">Subscribe to our newsletter and stay connected</div>
          </div>
          <div className="col-span-2 lg:col-span-1">
            <div className="flex justify-end">
              <div className="flex items-center w-full">
                <input
                  type="text"
                  className="flex-grow p-3 px-5 bg-transparent border-0 text-white bg-[#0f2128] rounded-md rounded-tr-none rounded-br-none focus:outline-none"
                  placeholder="Your email address"
                />
                <button className="p-3 px-5 bg-[#00a3f5] text-white font-medium rounded-md rounded-tl-none rounded-bl-none">
                  SUBSCRIBE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="bg-gray-600" />
      <div className="container px-4 py-20 mx-auto text-white">
        <div className="grid grid-cols-6 gap-12">
          <div className="col-span-4 md:col-span-2 lg:col-span-2">
            <div className="font-bold text-2xl mb-7">About Us</div>
            <div className="mb-5">
              LSHMB Cooperative is a complete Multi Purpose Cooperative Society. We have members from all areas of the
              community.
            </div>
            <div className="flex gap-3 items-center">
              <Link href="" className="w-[40px] h-[40px] flex justify-center items-center bg-gray-600 rounded-full">
                <FaFacebook className="w-4 h-4 fill-white" />
              </Link>

              <Link href="" className="w-[40px] h-[40px] flex justify-center items-center bg-gray-600 rounded-full">
                <FaTwitter className="w-4 h-4 fill-white" />
              </Link>

              <Link href="" className="w-[40px] h-[40px] flex justify-center items-center bg-gray-600 rounded-full">
                <FaInstagram className="w-4 h-4 fill-white" />
              </Link>

              <Link href="" className="w-[40px] h-[40px] flex justify-center items-center bg-gray-600 rounded-full">
                <FaLinkedin className="w-4 h-4 fill-white" />
              </Link>
            </div>
          </div>
          <div className="col-span-4 md:col-span-2 lg:col-span-1">
            <div className="font-bold text-2xl mb-7">Pages</div>
            <Link href="" className="block mb-5">
              Sign Up
            </Link>
            <Link href="" className="block mb-5">
              Our Branches
            </Link>
            <Link href="" className="block mb-5">
              Contact
            </Link>
          </div>
          <div className="col-span-4 md:col-span-2 lg:col-span-1">
            <div className="font-bold text-2xl mb-7">Useful Links</div>
            <Link href="" className="block mb-5">
              Membership Policy
            </Link>
            <Link href="" className="block mb-5">
              Privacy Policy
            </Link>
            <Link href="" className="block mb-5">
              Terms of Service
            </Link>
          </div>
          <div className="col-span-4 md:col-span-2 lg:col-span-2">
            <div className="font-bold text-2xl mb-7">Contact Us</div>
            <div className="flex items-start gap-4 mb-5">
              <FaLocationDot className="w-5 h-5 mr-2 fill-[#00a3f5]" />
              PO Box 223158 Oliver Street East Victoria 2006 UK
            </div>
            <div className="flex items-start gap-4 mb-5">
              <IoMdMail className="w-5 h-5 mr-2 fill-[#00a3f5]" />
              coop.lshmb@lshmb.com
            </div>
            <div className="flex items-start gap-4 mb-5">
              <FaPhone className="w-5 h-5 mr-2 fill-[#00a3f5]" />
              +44 123 0012 233
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
