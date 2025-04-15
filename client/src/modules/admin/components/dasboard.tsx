"use client";
import AdminRepository from "@/repository/adminRepository";
import { LoanQueryProps, LoansResultProps, TrxnQueryProps, TxnsResultProps, UserProps, UserQueryProps } from "@/types";
import currencyFormat from "@/utils/currencyFormat";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaUsers, FaMobileAlt, FaSyncAlt } from "react-icons/fa";
import { RecentLoanHistory, RecentMembers, RecentTransactionHistory } from "./tablecomponents";
import Link from "next/link";
import { FaMoneyBillTransfer } from "react-icons/fa6";

interface DataProps {
  users: { count: number; isVerified: number; isUnverified: number; total: number };
  loans: {
    total: number;
    pending: number;
    cancelled: number;
    approved: number;
    rejected: number;
  };
  savings: number;
}

const AdminDashboard = () => {
  const usersAnalyticsQuery = useQuery({
    queryKey: ["default-analytics"],
    queryFn: () => AdminRepository.getAdminAlytics(),
  });

  const loansQuery = useQuery({
    queryKey: ["loans"],
    queryFn: () => AdminRepository.findLoans({ limit: "5" } as LoanQueryProps),
  });

  const transactionQuery = useQuery({
    queryKey: ["txns"],
    queryFn: () => AdminRepository.getTransactions({ limit: "5" } as TrxnQueryProps),
  });

  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: () => AdminRepository.findUsers({ limit: "5" } as UserQueryProps),
  });

  const data = usersAnalyticsQuery?.data?.data?.data as DataProps;
  const loans = data?.loans;
  const users = data?.users;
  const savings = currencyFormat(data?.savings);
  const loansResult = loansQuery?.data?.data?.data as LoansResultProps;
  const trxnResult = transactionQuery?.data?.data?.data as TxnsResultProps;
  const usersResult = usersQuery?.data?.data?.data?.data as UserProps[];
  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {[
          {
            title: "Members",
            count: users?.total || 0,
            icon: FaUsers,
            bg: "bg-white",
            text: "text-blue-500",
            href: "/admin/users",
          },
          {
            title: "Verified Members",
            count: users?.isVerified || 0,
            icon: FaUsers,
            bg: "bg-white",
            text: "text-blue-500",
            href: "/admin/users?isVerified=true",
          },
          {
            title: "Unverified Members",
            count: users?.isUnverified || 0,
            icon: FaUsers,
            bg: "bg-white",
            text: "text-red-500",
            href: "/admin/users?isVerified=false",
          },
          {
            title: "Total Loans",
            count: loans?.total || 0,
            icon: FaMoneyBillTransfer,
            bg: "bg-white",
            text: "text-blue-500",
            href: "/admin/loans",
          },
          {
            title: "Pending Loans",
            count: loans?.pending || 0,
            icon: FaMoneyBillTransfer,
            bg: "bg-white",
            text: "text-orange-500",
            href: "/admin/loans?status=PENDING",
          },
          {
            title: "Approved Loans",
            count: loans?.approved || 0,
            icon: FaMoneyBillTransfer,
            bg: "bg-white",
            text: "text-green-500",
            href: "/admin/loans?status=APPROVED",
          },
          {
            title: "Rejected Loans",
            count: loans?.rejected || 0,
            icon: FaMoneyBillTransfer,
            bg: "bg-white",
            text: "text-red-500",
            href: "/admin/loans?status=REJECTED",
          },
          {
            title: "Cancelled Loans",
            count: loans?.cancelled || 0,
            icon: FaMoneyBillTransfer,
            bg: "bg-white",
            text: "text-purple-500",
            href: `/admin/loans?status=CANCELED`,
          },
          {
            title: "Total Savings",
            count: savings || 0,
            icon: FaSyncAlt,
            bg: "bg-white",
            text: "text-orange-500",
            href: "/admin/transaction?type=DEPOSIT",
          },
        ].map(({ title, count, icon: Icon, bg, text, href }, index) => (
          <div key={index} className={`${bg} shadow rounded-md p-4`}>
            <div className="flex justify-between gap-4">
              <div className="flex items-center">
                <Icon className={`${text} text-3xl mr-4`} />
                <div>
                  <h2 className="text-xl font-bold">{title}</h2>
                  <p className="text-2xl">{count}</p>
                </div>
              </div>
              <Link href={href} className="text-xs text-blue-600 underline">
                View All
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-4 mb-10">
        <RecentTransactionHistory data={trxnResult?.data} isLoading={transactionQuery.isPending} />
        <RecentLoanHistory data={loansResult?.data} isLoading={loansQuery.isPending} />
      </div>
      <RecentMembers data={usersResult} isLoading={usersQuery.isPending} />
    </div>
  );
};

export default AdminDashboard;
