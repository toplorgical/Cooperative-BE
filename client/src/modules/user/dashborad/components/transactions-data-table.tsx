import currencyFormat from "@/utils/currencyFormat";
import React from "react";
import moment from "moment";
import { TransactionHistoryProps } from "@/types";
import EmptyState from "@/components/empty-state";

const TxnsDataTable = ({ data }: { data: TransactionHistoryProps[] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="">
          <tr>
            <th className="text-left py-2 px-4 bg-gray-100 border-b text-nowrap">Date</th>
            <th className="text-left py-2 px-4 bg-gray-100 border-b text-nowrap">Type</th>
            <th className="text-left py-2 px-4 bg-gray-100 border-b text-nowrap">Desc</th>
            <th className="text-left py-2 px-4 bg-gray-100 border-b text-nowrap">Amount</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item.id}>
              <td className="text-left py-2 px-4 border-b border-b-gray-300 text-nowrap">
                {moment(item?.createdAt).format("YYYY-MM-DD")}
              </td>
              <td className="text-left py-2 px-4 border-b border-b-gray-300">{item.type}</td>
              <td
                className="text-left py-2 px-4 border-b border-b-gray-300 truncate"
                style={{ maxWidth: 150 }}
                title={item?.description}
              >
                {item.description}
              </td>
              <td className="text-left py-2 px-4 border-b border-b-gray-300">{currencyFormat(item.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <EmptyState isVisible={!data?.length} />
    </div>
  );
};

export default TxnsDataTable;
