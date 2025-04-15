"use client";

import LoanRepository from "@/repository/loanRepository";
import MessageRepository from "@/repository/messageRepository";
import ErrorService from "@/services/errorService";
import { LoanProps, MessageProps } from "@/types";
import currencyFormat from "@/utils/currencyFormat";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Modal } from "flowbite-react";
import React from "react";
import { toast } from "react-toastify";
import { LoanStatus } from "../../loans/components/loans-data-table";
import { AiOutlineLoading } from "react-icons/ai";

interface LoanModalProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
}

type ActionType = "accept" | "reject";

const ViewMessageModal = ({ isOpen, onClose, id, refetch }: LoanModalProps) => {
  const [action, setAction] = React.useState("");

  const messagesQuery = useQuery({
    enabled: !!id,
    queryKey: [`messages-${id}`, id],
    queryFn: () => MessageRepository.findOne(id),
  });

  const mutation = useMutation({
    mutationFn: (data: ActionType) => LoanRepository.gurantorsAction(id, data),
    onError: (error) => ErrorService.handler(error),
    onSuccess: ({ data }) => {
      refetch();
      setAction("");
      toast.success("Request updated successfully...");
    },
  });

  const result = messagesQuery?.data?.data?.data as MessageProps;
  const loan = result?.metadata?.data as LoanProps;
  const message = result?.description?.replace(
    /\[(.*?)\]/g,
    '<span style="font-weight:600; text-wrap: nowrap;">$1</span>'
  );

  return (
    <React.Fragment>
      <Modal show={isOpen} onClose={onClose}>
        <Modal.Header>Notification</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            {messagesQuery?.isPending && !result ? (
              <div className="h-full w-full flex items-center justify-center py-10">
                <div>
                  <AiOutlineLoading className="h-12 w-12 animate-spin text-blue-700" />
                </div>
              </div>
            ) : (
              <div className="mb-10">
                <div className="text-xl mb-5 font-semibold">{result?.title}</div>
                <div className="mb-10" dangerouslySetInnerHTML={{ __html: message }} />

                <div>
                  <div className="mb-5 text-xl font-semibold">Loan Details</div>
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
                  <div></div>
                  <hr />
                  <div className="flex justify-between items-center my-5">
                    <div>Total payment</div>
                    <div>{currencyFormat(loan?.totalRepayments)}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-end">
          {loan?.status !== "PENDING" ? (
            <button
              onClick={onClose}
              className="py-2 px-5 flex justify-center gap-5 items-center rounded-full border border-gray-300 text-gray-800 text-sm font-medium"
            >
              Close
            </button>
          ) : (
            <div className="flex justify-end gap-4 items-center">
              <button
                onClick={() => {
                  setAction("reject");
                  mutation.mutate("reject");
                }}
                className="py-2 px-5 flex justify-center gap-5 items-center rounded-full border border-red-500 text-red-800 text-sm font-medium"
              >
                {action === "reject" && mutation.isPending ? (
                  <AiOutlineLoading className="h-4 w-4 animate-spin" />
                ) : null}

                <span className="text-sm">Reject</span>
              </button>
              <button
                onClick={() => {
                  setAction("accept");
                  mutation.mutate("accept");
                }}
                className="py-2 px-5 flex justify-center gap-5 items-center rounded-full bg-[#00a3f5] text-white font-medium"
              >
                {action === "accept" && mutation.isPending ? (
                  <AiOutlineLoading className="h-4 w-4 animate-spin" />
                ) : null}

                <span className="text-sm">Accept</span>
              </button>
            </div>
          )}
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default ViewMessageModal;
