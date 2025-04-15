"use client";

import { Drawer } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FiMenu } from "react-icons/fi";
import { IoMdMail } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { RiLoginCircleLine } from "react-icons/ri";

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  function handleClose() {
    setIsOpen(false);
  }
  return (
    <React.Fragment>
      <header>
        <div className="container px-4 mx-auto">
          <div className="flex lg:hidden justify-end py-7">
            <button onClick={() => setIsOpen(true)} className="p-3 rounded-md hover:bg-[#00a3f522]">
              <FiMenu className="text-[#00a3f5] w-8 h-8" />
            </button>
          </div>
          <div className="hidden lg:flex items-center justify-between gap-4 py-7">
            <Image src="/assets/logo-2.png" width={50} height={50} className="object-contain" alt="L.S.H.M.B" />
            <div className="flex gap-4">
              <div className="flex items-center">
                <FaLocationDot className="w-5 h-5 mr-2 fill-[#00a3f5]" /> No 1. Ganiu Smith Street, Lagos Nigeria
              </div>
              <div className="min-w-1 bg-gray-300 h-full"></div>
              <hr />
              <div className="flex items-center">
                <IoMdMail className="w-5 h-5 mr-2 fill-[#00a3f5]" /> coop.lshmb@lshmb.com
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-gray-600 mr-4">Follow US</div>
              <div>
                <Link href="">
                  <FaFacebook className="w-4 h-4 fill-gray-600" />
                </Link>
              </div>
              <div>
                <Link href="">
                  <FaTwitter className="w-4 h-4 fill-gray-600" />
                </Link>
              </div>
              <div>
                <Link href="">
                  <FaInstagram className="w-4 h-4 fill-gray-600" />
                </Link>
              </div>
              <div>
                <Link href="">
                  <FaLinkedin className="w-4 h-4 fill-gray-600" />
                </Link>
              </div>
            </div>
          </div>
          <nav className="hidden lg:flex rounded-md bg-white p-3">
            <div className="flex justify-end gap-4 w-full">
              <ul className="flex justify-end gap-6 items-center">
                <li>
                  <Link
                    href="/"
                    className="p-3 font-medium hover:text-[#00a3f5] transition hover:border-b-2 hover:border-b-[#00a3f5]"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about-us"
                    className="p-3 font-medium hover:text-[#00a3f5] transition hover:border-b-2 hover:border-b-[#00a3f5]"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="p-3 font-medium hover:text-[#00a3f5] transition hover:border-b-2 hover:border-b-[#00a3f5]"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact-us"
                    className="p-3 font-medium hover:text-[#00a3f5] transition hover:border-b-2 hover:border-b-[#00a3f5]"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="signin"
                    className="flex items-center gap-2 p-3 px-5 rounded-md bg-[#00a3f5] text-white font-medium"
                  >
                    <RiLoginCircleLine /> SIGN IN
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
      <Drawer open={isOpen} onClose={handleClose}>
        <div className="flex justify-end">
          <button onClick={handleClose} className="p-3 rounded-md hover:bg-[#00a3f522]">
            <MdClose className="text-[#00a3f5] w-8 h-8" />
          </button>
        </div>
        <Drawer.Items>
          <div>
            <nav className="flex rounded-md bg-white p-3">
              <div className="w-full">
                <ul className="">
                  <li className="mb-5">
                    <Link
                      href="/"
                      className="p-3 text-2xl font-medium hover:text-[#00a3f5] transition hover:border-b-2 hover:border-b-[#00a3f5]"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="mb-5">
                    <Link
                      href="/about-us"
                      className="p-3 text-2xl font-medium hover:text-[#00a3f5] transition hover:border-b-2 hover:border-b-[#00a3f5]"
                    >
                      About
                    </Link>
                  </li>
                  <li className="mb-5">
                    <Link
                      href="/faq"
                      className="p-3 text-2xl font-medium hover:text-[#00a3f5] transition hover:border-b-2 hover:border-b-[#00a3f5]"
                    >
                      FAQ
                    </Link>
                  </li>
                  <li className="mb-5">
                    <Link
                      href="/contact-us"
                      className="p-3 text-2xl font-medium hover:text-[#00a3f5] transition hover:border-b-2 hover:border-b-[#00a3f5]"
                    >
                      Contact
                    </Link>
                  </li>
                  <li className="py-5">
                    <Link
                      href="signin"
                      className="flex items-center gap-2 p-3 px-5 rounded-md bg-[#00a3f5] text-white font-medium"
                    >
                      <RiLoginCircleLine /> SIGN IN
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </Drawer.Items>
      </Drawer>
    </React.Fragment>
  );
};

export default Header;
