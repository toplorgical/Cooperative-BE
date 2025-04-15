"use client";

import ActionModal from "@/components/cancel-modal";
import { UserContext } from "@/context/user-context";
import LoanRepository from "@/repository/loanRepository";
import ErrorService from "@/services/errorService";
import { LoanProps, LoanQueryProps, LoansResultProps } from "@/types";
import currencyFormat from "@/utils/currencyFormat";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Modal } from "flowbite-react";
import moment from "moment";
import React from "react";
import { toast } from "react-toastify";

interface LoanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EligibilityModal = ({ isOpen, onClose }: LoanModalProps) => {
  const { user } = React.useContext(UserContext);
  const [result, setResult] = React.useState(null);

  const loansQuery = useQuery({
    enabled: isOpen,
    queryKey: ["loans"],
    queryFn: () => LoanRepository.find({ status: "APPROVED" } as LoanQueryProps),
  });

  const loansResult = loansQuery?.data?.data?.data as LoansResultProps;

  const total = loansResult?.data?.reduce((a, c) => a + c.totalRepayments, 0);
  const balance = Number(user?.account?.balance || 0) - total;
  return (
    <React.Fragment>
      <Modal show={isOpen} onClose={onClose}>
        <Modal.Header>Loan Details</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div className="mb-10">
              <div className="text-center">{moment().format("MMM Do, YYYY")}</div>
              <div className="text-center text-3xl font-bold">Loan Eligibility</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="col-span-2 md:col-span-1"></div>
              <div className="col-span-2 md:col-span-1">
                <div className="flex justify-between items-center mb-5">
                  <div>Savings</div>
                  <div>{currencyFormat(user?.account?.balance || 0)}</div>
                </div>
                <div className="flex justify-between items-center mb-5">
                  <div>Total Loans</div>
                  <div>{currencyFormat(total || 0)}</div>
                </div>

                <hr />
                <div className="flex justify-between items-center my-5">
                  <div>Account Balance</div>
                  <div>{currencyFormat(balance)}</div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-end">
          <button
            onClick={onClose}
            className="py-2 px-5 flex justify-center gap-5 items-center rounded-full border border-gray-300 text-gray-800 text-sm font-medium"
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
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

export default EligibilityModal;
