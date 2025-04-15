import EmptyState from "@/components/empty-state";
import { LoanProps } from "@/types";
import currencyFormat from "@/utils/currencyFormat";
import React from "react";
import { IoEyeOutline } from "react-icons/io5";

const LoansDataTable = ({ data, onSelect }: { data: LoanProps[]; onSelect: (data: LoanProps) => void }) => {
  return (
    <React.Fragment>
      <table className="w-full">
        <thead className="">
          <tr>
            <th className="text-left py-2 px-4 bg-gray-100 border-b text-nowrap">Loan No.</th>
            <th className="text-left py-2 px-4 bg-gray-100 border-b text-nowrap">Amount</th>
            <th className="text-left py-2 px-4 bg-gray-100 border-b text-nowrap">Duration</th>
            <th className="text-left py-2 px-4 bg-gray-100 border-b text-nowrap">Loan Type</th>
            <th className="text-left py-2 px-4 bg-gray-100 border-b text-nowrap">Status</th>
            <th className="text-left py-2 px-4 bg-gray-100 border-b text-nowrap"></th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item.id}>
              <td className="text-left py-2 px-4 border-b border-b-gray-300">#{item.id}</td>
              <td className="text-left py-2 px-4 border-b border-b-gray-300">{currencyFormat(item?.amount)}</td>
              <td className="text-left py-2 px-4 border-b border-b-gray-300">{item?.duration} (months)</td>
              <td className="text-left py-2 px-4 border-b border-b-gray-300">{item?.loanType.name}</td>
              <td className="text-left py-2 px-4 border-b border-b-gray-300">
                <LoanStatus status={item?.status} />
              </td>
              <td>
                <button onClick={() => onSelect(item)}>
                  <IoEyeOutline className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <EmptyState isVisible={!data?.length} />
    </React.Fragment>
  );
};

export function LoanStatus({ status }: { status: string }) {
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

export default LoansDataTable;
