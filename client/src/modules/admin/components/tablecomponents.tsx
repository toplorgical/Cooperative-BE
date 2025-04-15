// src/components/UserTable.tsx
import React from "react";
import {
  FaMoneyBillWave,
  FaMoneyCheckAlt,
  FaExchangeAlt,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaBan,
} from "react-icons/fa";
import { LoanProps, LoansResultProps, TransactionHistoryProps, UserProps } from "@/types";
import currencyFormat from "@/utils/currencyFormat";
import moment from "moment";
import { AiOutlineLoading } from "react-icons/ai";
import Link from "next/link";
import { LoanStatus } from "@/modules/user/loans/components/loans-data-table";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const users: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "User" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
  // Add more users as needed
];

export const AllUsersTable = () => {
  const handleMakeAdmin = (userId: number) => {};

  const handleMakeSuperAdmin = (userId: number) => {};

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">User Management</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Role</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-4 py-2 border">{user.id}</td>
                <td className="px-4 py-2 border">{user.name}</td>
                <td className="px-4 py-2 border">{user.email}</td>
                <td className="px-4 py-2 border">{user.role}</td>
                <td className="px-4 py-2 border">
                  <button
                    className="bg-blue-500 text-white px-4 py-1 rounded mr-2"
                    onClick={() => handleMakeAdmin(user.id)}
                  >
                    Make Admin
                  </button>
                  <button
                    className="bg-green-500 text-white px-4 py-1 rounded"
                    onClick={() => handleMakeSuperAdmin(user.id)}
                  >
                    Make Super Admin
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const allLoansTable = () => {
  const handleMakeAdmin = (userId: number) => {};

  const handleMakeSuperAdmin = (userId: number) => {};

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">User Management</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Role</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-4 py-2 border">{user.id}</td>
                <td className="px-4 py-2 border">{user.name}</td>
                <td className="px-4 py-2 border">{user.email}</td>
                <td className="px-4 py-2 border">{user.role}</td>
                <td className="px-4 py-2 border">
                  <button
                    className="bg-blue-500 text-white px-4 py-1 rounded mr-2"
                    onClick={() => handleMakeAdmin(user.id)}
                  >
                    Approve Loan
                  </button>
                  <button
                    className="bg-green-500 text-white px-4 py-1 rounded"
                    onClick={() => handleMakeSuperAdmin(user.id)}
                  >
                    Cancel Loan
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const transactions = [
  { id: 1, transactionType: "Credit", date: "05 June 2021", amount: "$300", user: "egoba kelvin" },
  { id: 2, transactionType: "Credit", date: "04 June 2021", amount: "$35", user: "egoba kelvin" },
  { id: 3, transactionType: "Debit", date: "03 June 2021", amount: "$400", user: "egoba kelvin" },
  { id: 4, transactionType: "Transfer", date: "02 June 2021", amount: "$25", user: "egoba kelvin" },
];

const getTransactionCategoryIcon = (transactionType: string) => {
  switch (transactionType) {
    case "DEBIT":
      return <FaMoneyBillWave className="text-red-500" />;
    case "DEPOSIT":
      return <FaMoneyCheckAlt className="text-green-500" />;
    case "TRANSFER":
      return <FaExchangeAlt className="text-yellow-500" />;
    default:
      return null;
  }
};

export const RecentTransactionHistory = ({
  userId = "",
  data,
  isLoading,
}: {
  userId?: string;
  data: TransactionHistoryProps[];
  isLoading: boolean;
}) => {
  return (
    <div className="bg-white rounded-md shadow overflow-x-auto">
      <div className="">
        <div className="flex justify-between items-center p-4">
          <h1 className="text-xl font-bold">Recent Transactions</h1>
          <Link
            href={`/admin/transaction/${userId ? `?userId=${userId}` : ""}`}
            className="text-xs text-blue-600 underline"
          >
            View All
          </Link>
        </div>

        <div className="">
          <table className="w-full">
            <thead className="">
              <tr className="">
                <th className="text-left py-2 px-4 text-nowrap font-semibold border-b border-b-gray-300">Type</th>
                <th className="text-left py-2 px-4 text-nowrap font-semibold border-b border-b-gray-300">Date</th>
                <th className="text-left py-2 px-4 text-nowrap font-semibold border-b border-b-gray-300">Amount</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item) => (
                <tr key={item.id}>
                  <td className="text-left py-2 px-4 border-b border-b-gray-300 text-nowrap">{item.type}</td>
                  <td className="text-left py-2 px-4 border-b border-b-gray-300 text-nowrap">
                    {moment(item?.createdAt).format("MMM Do, YYYY")}
                  </td>
                  <td className="text-left py-2 px-4 border-b border-b-gray-300 text-nowrap">
                    {currencyFormat(item?.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {isLoading && !data?.length ? (
            <div className="h-full w-full flex items-center justify-center py-10">
              <div>
                <AiOutlineLoading className="h-12 w-12 animate-spin text-blue-700" />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export const RecentLoanHistory = ({
  userId = "",
  data,
  isLoading,
}: {
  data: LoanProps[];
  userId?: string;
  isLoading: boolean;
}) => {
  return (
    <div className="bg-white rounded-md shadow overflow-x-auto">
      <div className="">
        <div className="flex justify-between items-center p-4">
          <h1 className="text-xl font-bold">Recent Loans</h1>
          <Link href={`/admin/loans/${userId ? `?userId=${userId}` : ""}`} className="text-xs text-blue-600 underline">
            View All
          </Link>
        </div>
        <div className="">
          <table className="w-full">
            <thead className="">
              <tr className="">
                <th className="text-left py-2 px-4 text-nowrap font-semibold border-b border-b-gray-300">Type</th>
                <th className="text-left py-2 px-4 text-nowrap font-semibold border-b border-b-gray-300">Date</th>
                <th className="text-left py-2 px-4 text-nowrap font-semibold border-b border-b-gray-300">Amount</th>
                <th className="text-left py-2 px-4 text-nowrap font-semibold border-b border-b-gray-300">Status</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item) => (
                <tr key={item.id}>
                  <td className="text-left py-2 px-4 border-b border-b-gray-300 text-nowrap">{item?.loanType?.name}</td>
                  <td className="text-left py-2 px-4 border-b border-b-gray-300 text-nowrap">
                    {moment(item?.createdAt).format("MMM Do, YYYY")}
                  </td>
                  <td className="text-left py-2 px-4 border-b border-b-gray-300 text-nowrap">
                    {currencyFormat(item?.amount)}
                  </td>
                  <td className="text-left py-2 px-4 border-b border-b-gray-300">
                    <LoanStatus status={item?.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {isLoading && !data?.length ? (
            <div className="h-full w-full flex items-center justify-center py-10">
              <div>
                <AiOutlineLoading className="h-12 w-12 animate-spin text-blue-700" />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export const RecentMembers = ({ data, isLoading }: { data: UserProps[]; isLoading: boolean }) => {
  return (
    <div className="bg-white rounded-md shadow overflow-x-auto">
      <div className="">
        <div className="flex justify-between items-center p-4">
          <h1 className="text-xl font-bold">Recent Members</h1>
          <Link href={"/admin/users"} className="text-xs text-blue-600 underline">
            View All
          </Link>
        </div>
        <table className="w-full">
          <thead className="">
            <tr className="">
              <th className="text-left py-2 px-4 text-nowrap font-semibold border-b-gray-300">User</th>
              <th className="text-left py-2 px-4 text-nowrap font-semibold border-b-gray-300">Membership ID</th>
              <th className="text-center py-2 px-4 text-nowrap font-semibold border-b-gray-300">Email | Phone</th>
              <th className="text-center py-2 px-4 text-nowrap font-semibold border-b-gray-300">Joined At</th>
              <th className="text-left py-2 px-4 text-nowrap font-semibold border-b-gray-300">Balance</th>
              <th className="text-left py-2 px-4 text-nowrap font-semibold border-b-gray-300"></th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <tr key={item.id}>
                <td className="text-left text-nowrap py-2 px-4 border-b border-b-gray-300">
                  {item?.firstName} {item?.lastName}
                </td>
                <td className="text-left py-2 text-nowrap px-4 border-b border-b-gray-300">{item?.registrationId}</td>
                <td className="text-left py-2 px-4 border-b border-b-gray-300">
                  <span className="block text-nowrap text-center">{item?.phone}</span>
                </td>
                <td className="text-left py-2 px-4 border-b border-b-gray-300">
                  <span className="block text-nowrap text-center">
                    {moment(item?.createdAt).format("MMM Do, YYYY")}
                  </span>
                </td>
                <td className="text-left text-nowrap py-2 px-4 border-b border-b-gray-300">
                  {currencyFormat(item?.account?.balance)}
                </td>
                <td className="text-center py-2 px-4 border-b border-b-gray-300">
                  <Link href={`/admin/users/${item.id}`} className="text-blue-700 text-nowrap underline">
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isLoading && !data?.length ? (
          <div className="h-full w-full flex items-center justify-center py-10">
            <div>
              <AiOutlineLoading className="h-12 w-12 animate-spin text-blue-700" />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
