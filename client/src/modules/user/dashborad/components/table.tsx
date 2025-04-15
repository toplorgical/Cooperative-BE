import { TransactionProps } from "@/types";
import currencyFormat from "@/utils/currencyFormat";



interface TableDataProps {
  data: TransactionProps[];
}

export interface LoanTableProps {
  id: number;
  date: string;
  loanType: string;
  status: string;
  amount: number;
}

export interface LoanDataProps {
  data: LoanTableProps[];
}

export const TransactionTable = ({ data }: TableDataProps) => {
  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-2 px-4 bg-gray-100 border-b text-nowrap">ID</th>
          <th className="py-2 px-4 bg-gray-100 border-b text-nowrap">Date</th>
          <th className="py-2 px-4 bg-gray-100 border-b text-nowrap">Type</th>
          <th className="py-2 px-4 bg-gray-100 border-b text-nowrap">Desc</th>
          <th className="py-2 px-4 bg-gray-100 border-b text-nowrap">Amount</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((transaction: TransactionProps) => (
            <tr key={transaction.id}>
              <td className="py-2 px-4 border-b text-sm text-left ">{transaction.id}</td>
              <td className="py-2 px-4 border-b text-sm text-left text-nowrap">{transaction.date}</td>
              <td className="py-2 px-4 border-b text-sm text-left ">{transaction.type}</td>
              <td className="py-2 px-4 border-b text-sm text-left ">{transaction.description}</td>
              <td className="py-2 px-4 border-b text-sm text-left ">{currencyFormat(transaction.amount)}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td className="py-2 px-4 text-center border-b">You don&apos;t have any Recent Transaction</td>
          </tr>)}
        </tbody>
              </table>
    )}

export const LoanTable = ({ data }: LoanDataProps) => {
  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-2 px-4 bg-gray-100 border-b text-left">ID</th>
          <th className="py-2 px-4 bg-gray-100 border-b text-left">Date</th>
          <th className="py-2 px-4 bg-gray-100 border-b text-left">Loan Type</th>
          <th className="py-2 px-4 bg-gray-100 border-b text-left">Amount</th>
          <th className="py-2 px-4 bg-gray-100 border-b text-left">Status</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((transaction: LoanTableProps) => (
            <tr key={transaction.id}>
              <td className="py-2 px-4 border-b">{transaction.id}</td>
              <td className="py-2 px-4 border-b">{transaction.date}</td>
              <td className="py-2 px-4 border-b">{transaction.loanType}</td>
              <td className="py-2 px-4 border-b">{currencyFormat(transaction.amount)}</td>
              <td
                className={`py-2 px-4 border-b ${
                  transaction.status === "APPROVED"
                    ? " text-green-600"
                    : transaction.status === "PENDING"
                    ? " text-blue-600"
                    : " text-red-600"
                }`}
              >
                {transaction.status}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td className="py-2 px-4 text-center border-b">You don&apos;t have any Recent Loan</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
