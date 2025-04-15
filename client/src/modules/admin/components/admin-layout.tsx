"use client";

import pathnames from "@/constants/pathnames";
import { UserContext } from "@/context/user-context";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import { Avatar, Drawer } from "flowbite-react";
import Link from "next/link";
import { redirect, usePathname, useRouter } from "next/navigation";
import React from "react";
import { FaMoneyBill, FaRegBell, FaUsers } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { GiReceiveMoney } from "react-icons/gi";
import { GrUserSettings } from "react-icons/gr";
import { HiOutlineLogout } from "react-icons/hi";
import { LuPhone } from "react-icons/lu";
import {
  MdClose,
  MdDashboard,
  MdOutlineAdminPanelSettings,
  MdOutlineArrowDropDown,
  MdOutlineKeyboardArrowDown,
  MdOutlineWorkOutline,
} from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { TbUserScreen } from "react-icons/tb";

const links = [
  { Icon: MdDashboard, label: "Dashboard", href: "/admin/dashboard", children: [] },
  { Icon: FaUsers, label: "Members", href: "/admin/users" },
  { Icon: GiReceiveMoney, label: "Loans", href: "/admin/loans", children: [] },
  {
    Icon: FaMoneyBill,
    label: "Transactions",
    href: "/admin/transaction",
    children: [
      { label: "Deposit", href: "/admin/txns/savings" },
      { label: "Transfers", href: "/admin/txns/transfers" },
      { label: "Withdrawals", href: "/admin/txns/withdrawals" },
    ],
  },
];

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signout } = React.useContext(UserContext);
  const [isOpen, setIsOpen] = React.useState(false);
  let nameInitials = user ? `${user?.firstName?.charAt(0)}${user?.lastName?.charAt(0)}` : "";

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <React.Fragment>
      <div className="flex">
        <aside className="bg-blue-900 hidden lg:block h-screen min-w-56 w-56 pt-8 overflow-y-auto border-r border-r-blue-800">
          <div className="text-white font-bold text-xl mb-8 px-4">Admin Dashboard</div>
          <ul className="p-0">
            {links.map(({ Icon, ...item }) => (
              <li key={item.href} className="">
                <Link
                  href={item.href}
                  className={`hover:bg-blue-800 p-4 flex items-center gap-3 text-white ${
                    pathname.includes(item.href) ? "bg-blue-700" : ""
                  }`}
                >
                  <div className="flex flex-grow items-center gap-3">
                    <Icon className="w-6 h-6" />
                    <span>{item.label}</span>
                  </div>
                  {/* {item.children?.length ? (
                  <button style={{ all: "unset" }} onClick={() => toggleMenu(index)}>
                    <MdOutlineKeyboardArrowDown className="w-6 h-6" />
                  </button>
                ) : null} */}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
        <div className="flex-grow h-screen overflow-y-auto">
          <header className="flex justify-end gap-6 bg bg-blue-900 p-4">
            <button tabIndex={1} style={{ all: "unset", cursor: "pointer" }}>
              <FaRegBell className="text-white w-5 h-5" />
            </button>
            <div className="flex items-center space-x-4">
              <Menu
                menuButton={
                  <MenuButton className="flex justify-center items-center gap-3">
                    <Avatar
                      rounded
                      color="purple"
                      img={""}
                      alt={`avatar of ${user?.firstName}`}
                      placeholderInitials={nameInitials}
                    />
                    <span>
                      <MdOutlineArrowDropDown className="w-6 h-6 text-white" />
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
                      placeholderInitials={nameInitials}
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

                <MenuItem
                  href={pathnames.USER}
                  onClick={(e) => {
                    e.syntheticEvent.preventDefault();
                    window.location.assign(pathnames.USER);
                  }}
                >
                  <TbUserScreen className="mr-4 w-5 h-5" /> User Dashboard
                </MenuItem>

                <MenuItem className="text-red-600" onClick={signout}>
                  <HiOutlineLogout className="mr-4 w-5 h-5" /> Logout
                </MenuItem>
              </Menu>
              <button
                onClick={() => setIsOpen(true)}
                className="p-2 rounded-md hover:bg-[#00a3f522] inline-flex lg:hidden"
              >
                <FiMenu className="text-white w-6 h-6" />
              </button>
            </div>
          </header>
          <div className="p-4 bg-gray-100 min-h-screen">{children}</div>
        </div>
      </div>
      <Drawer open={isOpen} onClose={handleClose}>
        <div className="flex justify-end">
          <button onClick={handleClose} className="p-2 rounded-md hover:bg-[#00a3f522]">
            <MdClose className="text-blue-900 w-6 h-6" />
          </button>
        </div>
        <Drawer.Items>
          <aside className={`p-3`}>
            <nav>
              <ul>
                {links.map((item) => (
                  <li className="mb-4" key={item.label}>
                    <Link href={item.href} className={pathname.includes(item.href) ? "text-blue-900 font-bold" : ""}>
                      {item.label}
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

export default AdminLayout;
