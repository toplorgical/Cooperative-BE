import EmptyState from "@/components/empty-state";
import { LoanProps } from "@/types";
import currencyFormat from "@/utils/currencyFormat";
import React from "react";

const LoansDataTable = ({ data }: { data: LoanProps[] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="">
          <tr>
            <th className="text-left py-2 px-4 bg-gray-100 border-b text-nowrap">Loan No.</th>
            <th className="text-left py-2 px-4 bg-gray-100 border-b text-nowrap">Amount</th>
            <th className="text-left py-2 px-4 bg-gray-100 border-b text-nowrap">Duration</th>
            <th className="text-left py-2 px-4 bg-gray-100 border-b text-nowrap">Loan Type</th>
            <th className="text-left py-2 px-4 bg-gray-100 border-b text-nowrap">Status</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item.id}>
              <td className="text-left py-2 px-4 border-b border-b-gray-300">#{item.id}</td>
              <td className="text-left py-2 px-4 border-b border-b-gray-300">{currencyFormat(item.amount)}</td>
              <td className="text-left py-2 px-4 border-b border-b-gray-300">{item.duration} (months)</td>
              <td className="text-left py-2 px-4 border-b border-b-gray-300">{item?.loanType.name}</td>
              <td className="text-left py-2 px-4 border-b border-b-gray-300">
                {item.status === "APPROVED" ? (
                  <span className="text-xs rounded-full px-4 py-2 bg-green-300 text-green-600 font-medium">
                    {item.status}
                  </span>
                ) : item.status === "PENDING" ? (
                  <span className="text-xs rounded-full px-4 py-2 bg-orange-300 text-orange-600 font-medium">
                    {item.status}
                  </span>
                ) : item.status === "CANCELED" ? (
                  <span className="text-xs rounded-full px-4 py-2 bg-blue-300 text-blue-600 font-medium">
                    {item.status}
                  </span>
                ) : (
                  <span className="text-xs rounded-full px-4 py-2 bg-red-300 text-red-600 font-medium">
                    {item.status}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <EmptyState isVisible={!data?.length} />
    </div>
  );
};

export default LoansDataTable;
