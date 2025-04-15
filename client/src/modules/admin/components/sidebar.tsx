"use client";
import Link from "next/link";
import React, { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const AdminSidebar = () => {
  const [isManageUsersOpen, setIsManageUsersOpen] = useState(false);
  const [isDepositsOpen, setIsDepositsOpen] = useState(false);
  const [isLoansOpen, setIsLoansOpen] = useState(false);
  const [isTransactionsOpen, setIsTransactionsOpen] = useState(false);

  const toggleDropdown = (setFunction: React.Dispatch<React.SetStateAction<boolean>>) => {
    setFunction((prevState) => !prevState);
  };

  return (
    <div className="bg-blue-900 h-screen w-64 px-4 pt-8 overflow-auto">
      <div className="text-white font-bold text-2xl mb-8">Admin Dashboard</div>
      <ul>
        <li className="text-white py-2 px-4 rounded hover:bg-blue-700 cursor-pointer">Dashboard</li>

        <li
          className="text-white py-2 px-4 rounded hover:bg-blue-700 cursor-pointer flex justify-between items-center"
          onClick={() => toggleDropdown(setIsManageUsersOpen)}
        >
          <span>Manage Users</span>
          <MdOutlineKeyboardArrowDown className={`transition-transform ${isManageUsersOpen ? "rotate-180" : ""}`} />
        </li>
        {isManageUsersOpen && (
          <ul className="pl-8 mt-2 space-y-2">
            <li className="text-white py-2 px-4 rounded hover:bg-blue-700 cursor-pointer">
              <Link href={"/admin/dashboard/users"}>User Roles </Link>
            </li>
            <li className="text-white py-2 px-4 rounded hover:bg-blue-700 cursor-pointer">
              {" "}
              <Link href={"/admin/dashboard/users"}>User Roles </Link>{" "}
            </li>
          </ul>
        )}
        <li
          className="text-white py-2 px-4 rounded hover:bg-blue-700 cursor-pointer flex justify-between items-center"
          onClick={() => toggleDropdown(setIsDepositsOpen)}
        >
          <span>Deposits</span>
          <MdOutlineKeyboardArrowDown className={`transition-transform ${isDepositsOpen ? "rotate-180" : ""}`} />
        </li>
        {isDepositsOpen && (
          <ul className="pl-8 mt-2 space-y-2">
            <li className="text-white py-2 px-4 rounded hover:bg-blue-700 cursor-pointer">All Deposits</li>
            <li className="text-white py-2 px-4 rounded hover:bg-blue-700 cursor-pointer">Pending Deposits</li>
          </ul>
        )}
        <li
          className="text-white py-2 px-4 rounded hover:bg-blue-700 cursor-pointer flex justify-between items-center"
          onClick={() => toggleDropdown(setIsLoansOpen)}
        >
          <span>Loans</span>
          <MdOutlineKeyboardArrowDown className={`transition-transform ${isLoansOpen ? "rotate-180" : ""}`} />
        </li>
        {isLoansOpen && (
          <ul className="pl-8 mt-2 space-y-2">
            <li className="text-white py-2 px-4 rounded hover:bg-blue-700 cursor-pointer">All Loans</li>
            <li className="text-white py-2 px-4 rounded hover:bg-blue-700 cursor-pointer">Pending Loans</li>
          </ul>
        )}
        <li
          className="text-white py-2 px-4 rounded hover:bg-blue-700 cursor-pointer flex justify-between items-center"
          onClick={() => toggleDropdown(setIsTransactionsOpen)}
        >
          <span>Transactions</span>
          <MdOutlineKeyboardArrowDown className={`transition-transform ${isTransactionsOpen ? "rotate-180" : ""}`} />
        </li>
        {isTransactionsOpen && (
          <ul className="pl-8 mt-2 space-y-2">
            <li className="text-white py-2 px-4 rounded hover:bg-blue-700 cursor-pointer text-nowrap">
              All Transactions
            </li>
            <li className="text-white py-2 px-4 rounded hover:bg-blue-700 cursor-pointer text-nowrap">
              Pending Transactions
            </li>
          </ul>
        )}
      </ul>
    </div>
  );
};

export default AdminSidebar;
