"use client";

import AppLayout from "@/components/app-layout";
import PrivateRoute from "@/components/private-route";
  
import { SavingProps, TxnsResultProps } from "@/types";
 

import TransactionRepository, {TxnsQueryProps} from "@/repository/transactionsRepository";
import { useQuery } from "@tanstack/react-query";
 
import TxnsDataTable from "../dashborad/components/transactions-data-table";

const TransactionsModule = () => {
 

  const transactionsQuery = useQuery({
    queryKey: ["recent-transactions"],
    queryFn: () => TransactionRepository.find({ limit: 5 } as TxnsQueryProps),
  });

  const transactionResult = transactionsQuery?.data?.data?.data as TxnsResultProps;
 

  return (
    <PrivateRoute>
      <AppLayout>
        <div className="flex-1 p-6">
           
          <div className="rounded-md overflow-hidden bg-white shadow-md p-6 overflow-x-auto">
          <div className="bg-white rounded-xl shadow p-6">
          
              <TxnsDataTable data={transactionResult?.data} />
            </div>
          </div>
        </div>
       
      </AppLayout>
    </PrivateRoute>
  );
};

export default TransactionsModule;
