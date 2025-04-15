"use client";

import ActionModal from "@/components/cancel-modal";
import PrivateRoute from "@/components/private-route";
import ErrorService from "@/services/errorService";
import { LoanProps } from "@/types";
import currencyFormat from "@/utils/currencyFormat";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-toastify";
import AdminLayout from "../components/admin-layout";
import AdminRepository from "@/repository/adminRepository";
import { Avatar } from "flowbite-react";
import moment from "moment";

interface LoanModalProps {
  id: string;
}

const ViewLoanModule = ({ id }: LoanModalProps) => {
  const [isReject, setIsReject] = React.useState(false);
  const [isApprove, setIsApprove] = React.useState(false);

  const loansQuery = useQuery({
    enabled: !!id,
    queryKey: ["loan", id],
    queryFn: () => AdminRepository.findOneLoan(id),
  });

  const mutation = useMutation({
    mutationFn: (data: LoanProps) => AdminRepository.changeLoanStatus(data),
    onError: (error) => ErrorService.handler(error),
    onSuccess: ({ data }) => {
      setIsReject(false);
      setIsApprove(false);
      loansQuery.refetch();
      toast.success("Loan request updated successfully...");
    },
  });

  const loan = loansQuery?.data?.data?.data as LoanProps;
  const user = loan?.user;
  let nameInitials = user ? `${user?.firstName?.charAt(0)}${user?.lastName?.charAt(0)}` : "";

  function handleConfirm(status: "APPROVED" | "REJECTED") {
    mutation.mutate({ status, id } as LoanProps);
  }

  return (
    <PrivateRoute>
      <AdminLayout>
        <div className="flex justify-between items-center mb-4">
          <div className="text-xl font-semibold">Loans</div>
          {loan?.status === "PENDING" ? (
            <div className="flex gap-4 items-center justify-end">
              <button
                onClick={() => setIsReject(true)}
                className="py-2 px-5 flex justify-center gap-5 items-center rounded-full bg-red-500 text-white font-medium"
              >
                <span className="text-sm">Reject</span>
              </button>
              <button
                onClick={() => setIsApprove(true)}
                className="py-2 px-5 flex justify-center gap-5 items-center rounded-full bg-[#00a3f5] text-white font-medium"
              >
                <span className="text-sm">Approve</span>
              </button>
            </div>
          ) : null}
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-3 lg:col-span-1 shadow rounded-md bg-white">
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
                <div className="text-center">Monthly Payments</div>
                <div className="text-center text-3xl font-bold">{currencyFormat(loan?.monthlyRepayment)}</div>
              </div>

              <div className="flex justify-between items-center mb-5">
                <div>Status</div>
                <div>
                  <LoanStatus status={loan?.status} />
                </div>
              </div>
              <div className="flex justify-between items-center mb-5">
                <div>Loan Type</div>
                <div>{loan?.loanType?.name}</div>
              </div>
              <div className="flex justify-between items-center mb-5">
                <div>Annual Percentage Rate (APR)</div>
                <div>{loan?.rate}%</div>
              </div>
              <div className="flex justify-between items-center mb-5">
                <div>Total principal</div>
                <div>{currencyFormat(loan?.amount)}</div>
              </div>
              <div className="flex justify-between items-center mb-8">
                <div>Total interest</div>
                <div>{currencyFormat(loan?.totalInterest)}</div>
              </div>
              <div>
                <div className="text-xl font-semibold mb-3">Guarantors</div>
                {loan?.guarantors?.map((item, index) => (
                  <div className="flex justify-between items-center mb-5" key={index}>
                    <div>
                      {item?.user?.firstName} {item?.user?.lastName}
                    </div>
                    <div className="text-sm font-semibold">{item?.registrationId}</div>
                  </div>
                ))}
              </div>
              <hr />
              <div className="flex justify-between items-center my-5">
                <div>Total payment</div>
                <div>{currencyFormat(loan?.totalRepayments)}</div>
              </div>
            </div>
          </div>
        </div>
        <ActionModal
          title="Reject Loan"
          isOpen={isReject}
          isLoading={mutation.isPending}
          actionTitle={"Yes, reject loan"}
          onClose={() => setIsReject(false)}
          onConfirm={() => handleConfirm("REJECTED")}
          actionType="danger"
          description="If you are certain you want to proceed with the rejection, please confirm by clicking the button below. This action cannot be undone."
        />
        <ActionModal
          title="Approve Loan"
          isOpen={isApprove}
          isLoading={mutation.isPending}
          actionTitle={"Yes, approve loan"}
          onClose={() => setIsApprove(false)}
          onConfirm={() => handleConfirm("APPROVED")}
          description="If you are certain you want to proceed with the approval, please confirm by clicking the button below. This action cannot be undone."
        />
      </AdminLayout>
    </PrivateRoute>
  );
};

function LoanStatus({ status }: { status: string }) {
  return (
    <span>
      {status === "APPROVED" ? (
        <span className="text-green-600 text-xs font-semibold">{status}</span>
      ) : status === "PENDING" ? (
        <span className="text-orange-600 text-xs font-semibold">{status}</span>
      ) : status === "CANCELED" ? (
        <span className="text-blue-600 text-xs font-semibold">{status}</span>
      ) : (
        <span className="text-red-600 text-xs font-semibold">{status}</span>
      )}
    </span>
  );
}

export default ViewLoanModule;
