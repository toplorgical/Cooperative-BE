"use client";

import pathnames from "@/constants/pathnames";
import { UserContext } from "@/context/user-context";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import { Avatar, Drawer } from "flowbite-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { FiMenu } from "react-icons/fi";
import { GrUserSettings } from "react-icons/gr";
import { HiOutlineLogout } from "react-icons/hi";
import { LuPhone } from "react-icons/lu";
import { MdClose, MdOutlineAdminPanelSettings, MdOutlineArrowDropDown, MdOutlineWorkOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

const links = [
  { href: "/user/dashboard", title: "Dashboard" },
  { href: "/user/loans", title: "Loans" },
  { href: "/user/savings", title: "Savings" },
  { href: "/user/transactions", title: "Transactions" },
  { href: "/user/message", title: "Messages" },
  { href: "/user/settings", title: "Settings" },
];

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, signout } = React.useContext(UserContext);
  const [isOpen, setIsOpen] = React.useState(false);
  const userInitials = `${user?.firstName.charAt(0)}${user?.lastName.charAt(0)}`;

  function handleClose() {
    setIsOpen(false);
  }
  return (
    <React.Fragment>
      <div className="h-screen overflow-hidden bg-gradient-to-br from-[#F7FAFC] to-[#F7FAFC] flex flex-col">
        <header className="flex justify-between h-20 items-center bg-[#FFF] px-4 sm:px-6 lg:px-8 border-b">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold ml-4 sm:ml-0">L.S.H.M.B</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Menu
              menuButton={
                <MenuButton className="flex justify-center items-center gap-3">
                  <Avatar
                    rounded
                    color="purple"
                    img={""}
                    alt={`avatar of ${user?.firstName}`}
                    placeholderInitials={userInitials}
                  />
                  <span>
                    <MdOutlineArrowDropDown className="w-6 h-6" />
                  </span>
                </MenuButton>
              }
              transition
            >
              <div className="p-4 flex gap-4">
                <div>
                  <Avatar
                    rounded
                    size="md"
                    color="purple"
                    img={""}
                    alt={`avatar of ${user?.firstName}`}
                    placeholderInitials={userInitials}
                  />
                </div>
                <div>
                  <div className="font-semibold mb-1">
                    {user?.firstName} {user?.lastName}
                  </div>
                  <hr />
                </div>
              </div>

              <MenuItem
                href={pathnames.USER_SETTINGS + "?q=personal"}
                onClick={(e) => {
                  e.syntheticEvent.preventDefault();
                  router.push(pathnames.USER_SETTINGS + "?q=personal");
                }}
              >
                <GrUserSettings className="mr-4 w-5 h-5" /> Personal Info
              </MenuItem>
              <MenuItem
                href={pathnames.USER_SETTINGS + "?q=work"}
                onClick={(e) => {
                  e.syntheticEvent.preventDefault();
                  router.push(pathnames.USER_SETTINGS + "?q=work");
                }}
              >
                <MdOutlineWorkOutline className="mr-4 w-5 h-5" /> Work Info
              </MenuItem>

              <MenuItem
                href={pathnames.USER_SETTINGS + "?q=password"}
                onClick={(e) => {
                  e.syntheticEvent.preventDefault();
                  router.push(pathnames.USER_SETTINGS + "?q=password");
                }}
              >
                <RiLockPasswordLine className="mr-4 w-5 h-5" /> Change Password
              </MenuItem>
              <MenuItem
                href={pathnames.USER_SETTINGS + "?q=phone"}
                onClick={(e) => {
                  e.syntheticEvent.preventDefault();
                  router.push(pathnames.USER_SETTINGS + "?q=phone");
                }}
              >
                <LuPhone className="mr-4 w-5 h-5" /> Change Phone Number
              </MenuItem>
              {user?.role === "USER" ? null : (
                <MenuItem
                  href={pathnames.ADMIN}
                  onClick={(e) => {
                    e.syntheticEvent.preventDefault();
                    window.location.assign(pathnames.ADMIN);
                  }}
                >
                  <MdOutlineAdminPanelSettings className="mr-4 w-5 h-5" /> Administrator Panel
                </MenuItem>
              )}
              <MenuItem className="text-red-600" onClick={signout}>
                <HiOutlineLogout className="mr-4 w-5 h-5" /> Logout
              </MenuItem>
            </Menu>
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 rounded-md hover:bg-[#00a3f522] inline-flex lg:hidden"
            >
              <FiMenu className="text-[#00a3f5] w-6 h-6" />
            </button>
          </div>
        </header>
        <div className="flex flex-1 overflow-hidden">
          <aside className={`w-64 bg-[#F7FAFC] p-6 hidden lg:block border-r`}>
            <nav>
              <ul>
                {links.map((item) => (
                  <li className="mb-4" key={item.title}>
                    <Link href={item.href} className={pathname.includes(item.href) ? "text-[#00a3f5] font-bold" : ""}>
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
          <div className="flex-1 p-6 overflow-auto">{children}</div>
        </div>
      </div>

      <Drawer open={isOpen} onClose={handleClose}>
        <div className="flex justify-end">
          <button onClick={handleClose} className="p-2 rounded-md hover:bg-[#00a3f522]">
            <MdClose className="text-[#00a3f5] w-6 h-6" />
          </button>
        </div>
        <Drawer.Items>
          <aside className={`p-3`}>
            <nav>
              <ul>
                {links.map((item) => (
                  <li className="mb-4" key={item.title}>
                    <Link href={item.href} className={pathname.includes(item.href) ? "text-[#00a3f5] font-bold" : ""}>
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </Drawer.Items>
      </Drawer>
    </React.Fragment>
  );
};

export default AppLayout;
