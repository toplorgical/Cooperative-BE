"use client";

import ActionModal from "@/components/cancel-modal";
import PrivateRoute from "@/components/private-route";
import LoanRepository from "@/repository/loanRepository";
import ErrorService from "@/services/errorService";
import { LoanProps, TransactionProps, TxnsResultProps, UserProps } from "@/types";
import currencyFormat from "@/utils/currencyFormat";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { toast } from "react-toastify";

import AdminRepository from "@/repository/adminRepository";
import { Avatar } from "flowbite-react";
import moment from "moment";
import AdminLayout from "../components/admin-layout";

interface TrxnModalProps {
  id: string;
}

const ViewTransactionModule = ({ id }: TrxnModalProps) => {
  const trxnQuery = useQuery({
    enabled: !!id,
    queryKey: ["trxn", id],
    queryFn: () => AdminRepository.getOneTransaction(id),
  });

  const transaction = trxnQuery?.data?.data?.data as TransactionProps;
  const user = transaction?.user;
  let nameInitials = user ? `${user?.firstName?.charAt(0)}${user?.lastName?.charAt(0)}` : "";

  return (
    <PrivateRoute>
      <AdminLayout>
        <div className="grid grid-cols-3 gap-4 bg-white">
          <div className="col-span-3 lg:col-span-1 shadow rounded-md">
            <div className="text-center p-3">Member Information</div>
            <hr />
            <div className="flex justify-center p-3">
              <Avatar size="lg" className="rounded text-xl" placeholderInitials={nameInitials} />
            </div>
            <div className="p-3">
              <div className="mb-4">
                <div className="text-sm">User Name</div>
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
          <div className="col-span-3 lg:col-span-2 shadow rounded-md p-3 bg-white">
            <div>
              <div className="mb-10">
                <div className="text-center">Transaction Amount</div>
                <div className="text-center text-3xl font-bold">{currencyFormat(transaction?.amount)}</div>
              </div>

              <div className="flex justify-between items-center mb-5">
                <div>Transaction Type</div>
                <div>{transaction?.type}</div>
              </div>

              <div className="flex justify-between items-center mb-5">
                <div>Transaction Description</div>
                <div>{transaction?.description}</div>
              </div>
              <div className="flex justify-between items-center mb-8">
                <div>Transaction date</div>
                <div>{moment(transaction?.createdAt).format("MM-DD-YYYY")}</div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </PrivateRoute>
  );
};

export default ViewTransactionModule;
