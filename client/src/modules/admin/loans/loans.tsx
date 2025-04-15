"use client";

import React from "react";
import { BiSearch } from "react-icons/bi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LoanQueryProps, LoansResultProps, LoanTypeProps } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { LoanStatus } from "@/modules/user/loans/components/loans-data-table";
import currencyFormat from "@/utils/currencyFormat";
import { Pagination, Select } from "flowbite-react";
import Link from "next/link";
import AdminRepository from "@/repository/adminRepository";
import { AiOutlineLoading } from "react-icons/ai";
import { ReportButton } from "@/components/report-button";

const loanStatuses = [
  { label: "All Loans", value: "" },
  { label: "Pending", value: "PENDING" },
  { label: "Approved", value: "APPROVED" },
  { label: "Rejected", value: "REJECTED" },
  { label: "Cancelled", value: "CANCELED" },
];

const Loans = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const page = searchParams.get("page");
  const status = searchParams.get("status");
  const limit = searchParams.get("limit");
  const dateTo = searchParams.get("dateTo");
  const dateFrom = searchParams.get("dateFrom");
  const loanTypeId = searchParams.get("loanTypeId");
  const userId = searchParams.get("userId");
  const q = { limit, page, dateFrom, dateTo, loanTypeId, status, userId } as LoanQueryProps;

  const loansQuery = useQuery({
    queryKey: ["loans", ...Object.values(q)],
    queryFn: () => AdminRepository.findLoans(q),
  });

  const loansTypesQuery = useQuery({
    queryKey: ["loans-types"],
    queryFn: () => AdminRepository.getLoanTypes(),
  });

  const loansResult = loansQuery?.data?.data?.data as LoansResultProps;
  const loansTypesResult = loansTypesQuery?.data?.data?.data as { data: LoanTypeProps[] };

  return (
    <React.Fragment>
      <div className="text-lg font-semibold mb-4">Loans</div>
      <div className="flex flex-wrap justify-between gap-4 items-center mb-8">
        <ReportButton tableId="loan-table" fileName="loans" data={loansResult as any} />
        <div className="flex items-center gap-4">
          <select
            value={Number(loanTypeId) || ""}
            onChange={(e) => handleChangeQuery("loanTypeId", e.target.value)}
            className="block w-full px-3 py-2 rounded-md shadow-sm bg-white border-gray-300 focus:outline-none focus:border-blue-700"
          >
            <option value="">Loan Type</option>
            {loansTypesResult?.data?.map((item) => (
              <option value={item.id} key={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <select
            value={status || ""}
            onChange={(e) => handleChangeQuery("status", e.target.value)}
            className="block w-full px-3 py-2 rounded-md shadow-sm bg-white border-gray-300 focus:outline-none focus:border-blue-700"
          >
            <option value="">Loan Status</option>
            {loanStatuses?.map((item) => (
              <option value={item.value} key={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <div className="items-center hidden">
            <input
              type="text"
              className="block min-w-full px-3 rounded-bl-md rounded-tl-md py-2 h-10 bg-white border-gray-300 focus:outline-none focus:border-blue-700"
            />
            <button className="bg-blue-700 border-blue-700 px-3 py-2 h-10 rounded-tr-md rounded-br-md ">
              <BiSearch className="text-white" />
            </button>
          </div>
        </div>
      </div>

      <div>
        <div className="overflow-x-auto shadow rounded-md bg-white mb-4">
          <table className="w-full" id="loan-table">
            <thead className="bg-blue-700 text-white">
              <tr className="">
                <th className="text-left py-2 px-4 text-nowrap font-semibold">Loan No.</th>
                <th className="text-left py-2 px-4 text-nowrap font-semibold">Amount</th>
                <th className="text-left py-2 px-4 text-nowrap font-semibold">Duration</th>
                <th className="text-left py-2 px-4 text-nowrap font-semibold">Loan Type</th>
                <th className="text-left py-2 px-4 text-nowrap font-semibold">Status</th>
                <th className="text-left py-2 px-4 text-nowrap font-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {loansResult?.data?.map((item) => (
                <tr key={item.id}>
                  <td className="text-left py-2 px-4 border-b border-b-gray-300">#{item.id}</td>
                  <td className="text-left py-2 px-4 border-b border-b-gray-300">{currencyFormat(item?.amount)}</td>
                  <td className="text-left py-2 px-4 border-b border-b-gray-300">{item?.duration} (months)</td>
                  <td className="text-left py-2 px-4 border-b border-b-gray-300">{item?.loanType.name}</td>
                  <td className="text-left py-2 px-4 border-b border-b-gray-300">
                    <LoanStatus status={item?.status} />
                  </td>
                  <td className="text-center py-2 px-4 border-b border-b-gray-300">
                    <Link href={`/admin/loans/${item.id}`} className="text-blue-700 underline">
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {loansQuery.isPending && !loansResult?.data?.length ? (
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
            totalPages={loansResult?.totalPages || 1}
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

export default Loans;
