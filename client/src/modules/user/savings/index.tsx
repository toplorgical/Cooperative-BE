"use client";

import AppLayout from "@/components/app-layout";
import PrivateRoute from "@/components/private-route";
import { TxnsResultProps } from "@/types";
import { useState } from "react";
import TransactionRepository, { TxnsQueryProps } from "@/repository/transactionsRepository";
import { useQuery } from "@tanstack/react-query";
import TxnsDataTable from "../dashborad/components/transactions-data-table";
import FundingModal from "./components/funding-modal";
import { MdOutlinePayments } from "react-icons/md";

const SavingsModule = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const transactionsQuery = useQuery({
    queryKey: ["deposit"],
    queryFn: () => TransactionRepository.find({ limit: 5 } as TxnsQueryProps),
  });

  const transactionResult = transactionsQuery?.data?.data?.data as TxnsResultProps;

  return (
    <PrivateRoute>
      <AppLayout>
        <div className="flex-1 p-6">
          <div className="flex justify-between items-center mb-7">
            <div className="font-medium text-2xl">Recent Transactions</div>
            <div className="flex items-center">
              <button
                className="flex gap-2 items-center bg-[#00a3f5] text-white font-medium px-4 py-2 rounded-md"
                onClick={() => setIsModalOpen(true)}
              >
                <MdOutlinePayments className="w-5 h-5" /> <span>Fund Account</span>
              </button>
            </div>
          </div>
          <div className="rounded-md overflow-hidden bg-white shadow-md p-6 overflow-x-auto">
            <TxnsDataTable data={transactionResult?.data} />
          </div>
        </div>
        <div className="min-h-[500px]">
          <FundingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
      </AppLayout>
    </PrivateRoute>
  );
};

export default SavingsModule;
