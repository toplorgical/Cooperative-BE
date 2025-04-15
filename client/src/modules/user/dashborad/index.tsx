"use client";

import React from "react";
import AppLayout from "@/components/app-layout";
import PrivateRoute from "@/components/private-route";
import { useQuery } from "@tanstack/react-query";
import AnalyticsRepository from "@/repository/analyticRepository";
import currencyFormat from "@/utils/currencyFormat";
import TransactionRepository, { TxnsQueryProps } from "@/repository/transactionsRepository";
import LoanRepository, { LoanQueryProps } from "@/repository/loanRepository";
import { LoansResultProps, TxnsResultProps } from "@/types";
import TxnsDataTable from "./components/transactions-data-table";
import LoansDataTable from "./components/loans-data-table";

type DefaultAnalyticProps = {
  accountBalance: number;
  approvedLoansCount: number;
  loansBalance: number;
  loansCount: number;
  rejectedLoansCount: number;
  txnsCount: number;
  txnsCountLastWeek: number;
};
const DashboardModule = () => {
  
  const defaultAnalyticsQuery = useQuery({
    queryKey: ["default-analytics"],
    queryFn: () => AnalyticsRepository.getDefaultAnalytics(),
  });

  const transactionsQuery = useQuery({
    queryKey: ["recent-transactions"],
    queryFn: () => TransactionRepository.find({ limit: 5 } as TxnsQueryProps),
  });

  const loansQuery = useQuery({
    queryKey: ["recent-loans"],
    queryFn: () => LoanRepository.find({ limit: 5 } as LoanQueryProps),
  });

  const defaultAnalytics = defaultAnalyticsQuery?.data?.data?.data as DefaultAnalyticProps;
  const loansResult = loansQuery?.data?.data?.data as LoansResultProps;
  const transactionResult = transactionsQuery?.data?.data?.data as TxnsResultProps;

  return (
    <PrivateRoute>
      <AppLayout>
        <div className="flex-1">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gradient-to-br from-[#E62E43] to-[#F0A894] text-white rounded-xl p-6 flex flex-col items-center">
              <h2 className="text-xl font-bold">Saving Balance</h2>
              <span className="text-4xl mt-4">{currencyFormat(defaultAnalytics?.accountBalance)}</span>
              <span>Since Last Week</span>
            </div>
            <div className="bg-gradient-to-br from-[#796AE7] to-[#BE5DD4] text-white rounded-xl p-6 flex flex-col items-center">
              <h2 className="text-xl font-bold">Transaction Count</h2>
              <span className="text-4xl mt-4">{defaultAnalytics?.txnsCountLastWeek}</span>
              <span>Since Last Week</span>
            </div>
          </section>
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-20">
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
              <TxnsDataTable data={transactionResult?.data} />
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <h2 className="text-xl font-bold mb-4">Loan Borrowed</h2>
              <div className="relative w-32 h-32">
                <svg viewBox="0 0 36 36" className="w-full h-full">
                  <path
                    className="text-purple-500"
                    strokeDasharray="220, 360"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    className="text-gray-300"
                    strokeDasharray="140, 360"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDashoffset="220"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">
                  {currencyFormat(defaultAnalytics?.loansBalance, "compact")}
                </div>
              </div>
              <div className="flex space-x-6 mt-4">
                <div className="flex items-center space-x-2">
                  <span className="block w-4 h-4 bg-purple-500"></span>
                  <span>Reviewed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="block w-4 h-4 bg-gray-300"></span>
                  <span>Rejected</span>
                </div>
              </div>
            </div>
          </section>
          <section className="grid grid-cols-1 md:grid-cols-1 mt-20 mx-auto ">
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-bold mb-4 ">Recent Loans</h2>
              <LoansDataTable data={loansResult?.data} />
            </div>
          </section>
        </div>
      </AppLayout>
    </PrivateRoute>
  );
};

export default DashboardModule;
