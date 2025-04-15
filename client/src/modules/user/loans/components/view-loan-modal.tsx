"use client";

import ActionModal from "@/components/cancel-modal";
import LoanRepository from "@/repository/loanRepository";
import ErrorService from "@/services/errorService";
import { LoanProps } from "@/types";
import currencyFormat from "@/utils/currencyFormat";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Modal } from "flowbite-react";
import React from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { toast } from "react-toastify";

interface LoanModalProps {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
  id: string;
  loan?: LoanProps | null;
}

const ViewLoanModal = ({ isOpen, onClose, loan, id, refetch }: LoanModalProps) => {
  const [isCancel, setIsCancel] = React.useState(false);

  const loansQuery = useQuery({
    enabled: isOpen && !!id,
    queryKey: ["loan", id],
    queryFn: () => LoanRepository.findOne(id),
  });

  const mutation = useMutation({
    mutationFn: () => LoanRepository.cancel(id),
    onError: (error) => ErrorService.handler(error),
    onSuccess: ({ data }) => {
      refetch();
      setIsCancel(false);
      loansQuery.refetch();
      toast.success("Loan request cancelled successfully...");
    },
  });

  const result = loansQuery?.data?.data?.data as LoanProps;
  if (!loan && result) loan = result;

  function handleConfirm() {
    mutation.mutate();
  }
  return (
    <React.Fragment>
      <Modal show={isOpen} onClose={onClose}>
        <Modal.Header>Loan Details</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            {!loan ? (
              <div className="h-full w-full flex items-center justify-center">
                <div>
                  <AiOutlineLoading className="h-12 w-12 animate-spin text-[#53A4F5]" />
                </div>
              </div>
            ) : (
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
            )}
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-end">
          <button
            onClick={onClose}
            className="py-2 px-5 flex justify-center gap-5 items-center rounded-full border border-gray-300 text-gray-800 text-sm font-medium"
          >
            Close
          </button>
          {loan?.status !== "PENDING" ? null : (
            <button
              onClick={() => setIsCancel(true)}
              className="py-2 px-5 flex justify-center gap-5 items-center rounded-full bg-[#00a3f5] text-white font-medium"
            >
              <span className="text-sm">Cancel Loan</span>
            </button>
          )}
        </Modal.Footer>
      </Modal>
      <ActionModal
        title="Cancel Loan"
        isOpen={isCancel}
        isLoading={mutation.isPending}
        actionTitle={"Yes, cancel loan"}
        onClose={() => setIsCancel(false)}
        onConfirm={handleConfirm}
        description="If you are certain you want to proceed with the cancellation, please confirm by clicking the button below. This action cannot be undone."
      />
    </React.Fragment>
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

export default ViewLoanModal;
