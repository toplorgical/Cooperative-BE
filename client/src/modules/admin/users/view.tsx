"use client";

import ActionModal from "@/components/cancel-modal";
import PrivateRoute from "@/components/private-route";
import LoanRepository from "@/repository/loanRepository";
import ErrorService from "@/services/errorService";
import {
  LoanProps,
  LoanQueryProps,
  LoansResultProps,
  TransactionProps,
  TrxnQueryProps,
  TxnsResultProps,
  UserProps,
} from "@/types";
import currencyFormat from "@/utils/currencyFormat";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { toast } from "react-toastify";

import AdminRepository from "@/repository/adminRepository";
import { Avatar } from "flowbite-react";
import moment from "moment";
import AdminLayout from "../components/admin-layout";
import {
  FaUsers,
  FaEnvelope,
  FaMobileAlt,
  FaSyncAlt,
  FaBan,
  FaMoneyBillWave,
  FaTimesCircle,
  FaClock,
  FaUserCheck,
} from "react-icons/fa";
import { RecentLoanHistory, RecentTransactionHistory } from "../components/tablecomponents";
import { UserContext } from "@/context/user-context";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import Link from "next/link";

interface TrxnModalProps {
  id: string;
}

interface DataProps {
  loans: {
    total: number;
    pending: number;
    cancelled: number;
    approved: number;
    rejected: number;
  };
  savings: number;
}

const ViewUserModule = ({ id }: TrxnModalProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { user: authenticatedUser } = React.useContext(UserContext);

  const userQuery = useQuery({
    queryKey: ["user", id],
    queryFn: () => AdminRepository.findOneUser(id),
  });

  const { data: userAnalytics } = useQuery({
    queryKey: ["default-analytics"],
    queryFn: () => AdminRepository.getAdminAlytics({ userId: id }),
  });

  const trxnQuery = useQuery({
    queryKey: ["txns", id],
    queryFn: () => AdminRepository.getTransactions({ limit: "3", userId: id } as TrxnQueryProps),
  });

  const loansQuery = useQuery({
    queryKey: ["loans", id],
    queryFn: () => AdminRepository.findLoans({ limit: "3", userId: id } as LoanQueryProps),
  });

  const user = userQuery?.data?.data?.data as UserProps;
  const trxnResult = trxnQuery?.data?.data?.data as TxnsResultProps;
  const loansResult = loansQuery?.data?.data?.data as LoansResultProps;
  let nameInitials = user ? `${user?.firstName?.charAt(0)}${user?.lastName?.charAt(0)}` : "";
  const userAxtics = userAnalytics?.data?.data as DataProps;
  return (
    <PrivateRoute>
      <AdminLayout>
        <div className="flex justify-between items-center mb-4">
          <div className="text-xl font-semibold">
            {user?.firstName} {user?.lastName}
          </div>
          {authenticatedUser?.role === "SUPER_ADMIN" && user?.role !== "SUPER_ADMIN" ? (
            <button
              onClick={() => setIsOpen(true)}
              className="py-2 px-5 flex justify-center gap-5 items-center rounded-full bg-[#00a3f5] text-white font-medium"
            >
              <span className="text-sm">Change Role</span>
            </button>
          ) : null}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {[
            {
              title: "Total Loans",
              count: userAxtics?.loans?.total,
              icon: FaMoneyBillTransfer,
              bg: "bg-white",
              text: "text-blue-500",
              href: `/admin/loans?userId=${id}`,
            },
            {
              title: "Pending Loans",
              count: userAxtics?.loans?.pending,
              icon: FaMoneyBillTransfer,
              bg: "bg-white",
              text: "text-orange-500",
              href: `/admin/loans?status=PENDING&userId=${id}`,
            },
            {
              title: "Approved Loans",
              count: userAxtics?.loans?.approved,
              icon: FaMoneyBillTransfer,
              bg: "bg-white",
              text: "text-green-500",
              href: `/admin/loans?status=APPROVED&userId=${id}`,
            },
            {
              title: "Rejected Loans",
              count: userAxtics?.loans?.rejected,
              icon: FaMoneyBillTransfer,
              bg: "bg-white",
              text: "text-red-500",
              href: `/admin/loans?status=REJECTED&userId=${id}`,
            },
            {
              title: "Cancelled Loans",
              count: userAxtics?.loans?.cancelled,
              icon: FaMoneyBillTransfer,
              bg: "bg-white",
              text: "text-purple-500",
              href: `/admin/loans?status=CANCELED&userId=${id}`,
            },
            {
              title: "Total Savings",
              count: currencyFormat(user?.account?.balance),
              icon: FaSyncAlt,
              bg: "bg-white",
              text: "text-orange-500",
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
                {href ? (
                  <Link href={href} className="text-xs text-blue-600 underline">
                    View All
                  </Link>
                ) : null}
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="col-span-3 lg:col-span-1 shadow rounded-md bg-white">
            <div className="text-center p-3">Member Information</div>
            <hr />
            <div className="flex justify-center p-3">
              <Avatar size="lg" className="rounded text-xl" placeholderInitials={nameInitials} />
            </div>
            <div className="p-3">
              <div className="mb-4">
                <div className="text-sm">Member Name</div>
                <div className="font-semibold">
                  {user?.firstName} {user?.lastName}
                </div>
              </div>
              <div className="mb-4">
                <div className="text-sm">Membership ID</div>
                <div className="font-semibold">{user?.registrationId}</div>
              </div>
              <div className="mb-4">
                <div className="text-sm">Joined Date</div>
                <div className="font-semibold">{moment(user?.createdAt).format("MMM Do, YYYY")}</div>
              </div>
            </div>
          </div>
          <div className="col-span-3 lg:col-span-2 shadow rounded-md bg-white">
            <div className="grid grid-cols-2 gap-y-4 mb-10">
              <div className="col-span-2 lg:col-span-1">
                <div className="p-3">Personal Information</div>
                <hr />
                <div className="p-3">
                  <div className="mb-4">
                    <div className="text-sm">Phone Number</div>
                    <div className="font-semibold">{user?.phone}</div>
                  </div>
                  <div className="mb-4">
                    <div className="text-sm">Nationality</div>
                    <div className="font-semibold">{user?.nationality}</div>
                  </div>
                  <div className="mb-4">
                    <div className="text-sm">Address</div>
                    <div className="font-semibold">{user?.contactAddress}</div>
                  </div>
                  <div className="mb-4">
                    <div className="text-sm">State</div>
                    <div className="font-semibold">{user?.state}</div>
                  </div>
                  <div className="mb-4">
                    <div className="text-sm">Local Government Area (LGA)</div>
                    <div className="font-semibold">{user?.lga}</div>
                  </div>
                  <div className="mb-4">
                    <div className="text-sm">Postal Code</div>
                    <div className="font-semibold">{user?.postalCode}</div>
                  </div>
                </div>
              </div>
              <div className="col-span-2 lg:col-span-1">
                <div className="p-3">Work Information</div>
                <hr />
                <div className="p-3">
                  <div className="mb-4">
                    <div className="text-sm">Job Title</div>
                    <div className="font-semibold">{user?.jobTitle}</div>
                  </div>
                  <div className="mb-4">
                    <div className="text-sm">Employment Type</div>
                    <div className="font-semibold">{user?.employmentType}</div>
                  </div>
                  <div className="mb-4">
                    <div className="text-sm">Employment Location</div>
                    <div className="font-semibold">{user?.employmentLocation}</div>
                  </div>
                  <div className="mb-4">
                    <div className="text-sm">Employment Start Date</div>
                    <div className="font-semibold">{moment(user?.employmentStartDate).format("MMM Do, YYYY")}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 mb-10">
          <RecentTransactionHistory data={trxnResult?.data} isLoading={trxnQuery.isPending} userId={id} />
          <RecentLoanHistory data={loansResult?.data} isLoading={loansQuery.isPending} userId={id} />
        </div>
      </AdminLayout>
    </PrivateRoute>
  );
};

export default ViewUserModule;
