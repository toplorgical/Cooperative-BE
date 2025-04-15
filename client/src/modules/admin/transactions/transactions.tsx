"use client";

import React from "react";
import { BiSearch } from "react-icons/bi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { TrxnQueryProps, TxnsResultProps } from "@/types";
import { useQuery } from "@tanstack/react-query";
import currencyFormat from "@/utils/currencyFormat";
import { Pagination, Select } from "flowbite-react";
import Link from "next/link";
import AdminRepository from "@/repository/adminRepository";
import { AiOutlineLoading } from "react-icons/ai";
import { ReportButton } from "@/components/report-button";

const Transactions = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");
  const userId = searchParams.get("userId");
  const type = searchParams.get("type");

  const transactionQuery = useQuery({
    queryKey: ["txns", limit],
    queryFn: () => AdminRepository.getTransactions({ limit, page, userId, type } as TrxnQueryProps),
  });

  const txnsResult = transactionQuery?.data?.data?.data as TxnsResultProps;
  return (
    <React.Fragment>
      <div className="text-lg font-semibold mb-4">Transactions</div>
      <div className="flex flex-wrap justify-between gap-4 items-center mb-8">
        <ReportButton tableId={"trxn-table"} fileName={"Transaction"} data={txnsResult as any} />
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <input
              type="text"
              className="block px-3 rounded-bl-md rounded-tl-md py-2 h-10 bg-white border-gray-300 focus:outline-none focus:border-blue-700"
            />
            <button className="bg-blue-700 border-blue-700 px-3 py-2 h-10 rounded-tr-md rounded-br-md ">
              <BiSearch className="text-white" />
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="overflow-x-auto shadow rounded-md bg-white mb-4">
          <table className="w-full" id="trxn-table">
            <thead className="bg-blue-700 text-white">
              <tr className="">
                <th className="text-left py-2 px-4 text-nowrap font-semibold">Full Name</th>
                <th className="text-left py-2 px-4 text-nowrap font-semibold">Member Id</th>
                <th className="text-left py-2 px-4 text-nowrap font-semibold">Amount</th>
                <th className="text-left py-2 px-4 text-nowrap font-semibold">Description</th>
                <th className="text-left py-2 px-4 text-nowrap font-semibold">Type</th>
                <th className="text-left py-2 px-4 text-nowrap font-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {txnsResult?.data?.map((item) => (
                <tr key={item.id}>
                  <td className="text-left py-2 px-4 border-b border-b-gray-300">
                    {item?.user.firstName} {item?.user?.lastName}
                  </td>
                  <td className="text-left py-2 px-4 border-b border-b-gray-300">{item?.user?.registrationId}</td>
                  <td className="text-left py-2 px-4 border-b border-b-gray-300">{currencyFormat(item?.amount)}</td>
                  <td className="text-left py-2 px-4 border-b border-b-gray-300">{item?.description} </td>
                  <td className="text-left py-2 px-4 border-b border-b-gray-300">{item?.type} </td>
                  <td className="text-center py-2 px-4 border-b border-b-gray-300">
                    <Link href={`/admin/transaction/${item.id}`} className="text-[#00a3f5] underline">
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {transactionQuery.isPending && !txnsResult?.data?.length ? (
            <div className="h-full w-full flex items-center justify-center py-10">
              <div>
                <AiOutlineLoading className="h-12 w-12 animate-spin text-blue-700" />
              </div>
            </div>
          ) : null}
        </div>
        <div className="flex justify-end items-center gap-4">
          <Select value={limit || ""} onChange={(e) => handleChangeQuery("limit", e.target.value)}>
            <option value="">Limit</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="200">200</option>
          </Select>
          <Pagination
            className="app__pagination"
            currentPage={Number(page)}
            totalPages={txnsResult?.totalPages || 1}
            onPageChange={(page) => handleChangeQuery("page", page)}
            showIcons
          />
        </div>
      </div>
    </React.Fragment>
  );

  function handleChangeQuery(
    name: "page" | "limit" | "dateFrom" | "dateTo" | "loanTypeId" | "id" | "status",
    value: string | number
  ) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value as string);
    router.replace(`${pathname}?${params.toString()}`);
  }
};

export default Transactions;
