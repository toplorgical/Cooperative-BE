"use client";

import pathnames from "@/constants/pathnames";
import LoanRepository from "@/repository/loanRepository";
import { LoanProps, LoanQueryProps, LoansResultProps, LoanTypeProps } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { RiEditFill } from "react-icons/ri";
import LoansDataTable from "./loans-data-table";
import ViewLoanModal from "./view-loan-modal";

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
  const [selectedLoan, setSelectedLoan] = React.useState<LoanProps | null>(null);

  const loansQuery = useQuery({
    queryKey: ["loans", page, limit, dateFrom, dateTo, loanTypeId, status],
    queryFn: () => LoanRepository.find({ limit, page, dateFrom, dateTo, loanTypeId, status } as LoanQueryProps),
  });

  const loansTypesQuery = useQuery({
    queryKey: ["loans-types"],
    queryFn: () => LoanRepository.getLoanTypes(),
  });

  const loansResult = loansQuery?.data?.data?.data as LoansResultProps;
  const loansTypesResult = loansTypesQuery?.data?.data?.data as { data: LoanTypeProps[] };

  return (
    <div>
      <div className="flex-1">
        <div className="flex justify-between flex-wrap gap-6 items-center mb-7">
          <div className="flex gap-6 items-center flex-wrap">
            <div className="mb-5">
              <label htmlFor="" className="d-block">
                Loan Type:
              </label>
              <select
                value={Number(loanTypeId) || ""}
                onChange={(e) => handleChangeQuery("loanTypeId", e.target.value)}
                className="block px-3 py-2 rounded-md shadow-sm bg-white border-gray-300 focus:outline-none focus:border-[#00a3f5]"
              >
                <option value="">-- Loan Type --</option>
                {loansTypesResult?.data?.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-5">
              <label htmlFor="" className="d-block">
                Loan Status:
              </label>
              <select
                value={status || ""}
                onChange={(e) => handleChangeQuery("status", e.target.value)}
                className="block px-3 py-2 rounded-md shadow-sm bg-white border-gray-300 focus:outline-none focus:border-[#00a3f5]"
              >
                <option value="">-- Loan Status --</option>
                {loanStatuses?.map((item) => (
                  <option value={item.value} key={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-5">
              <label htmlFor="" className="d-block">
                From:
              </label>
              <input
                type="date"
                value={dateFrom || ""}
                onChange={(e) => handleChangeQuery("dateFrom", e.target.value)}
                className="bg-white block px-3 py-2 rounded-md shadow-sm border-gray-300 focus:outline-none focus:border-[#00a3f5]"
              />
            </div>
            <div className="mb-5">
              <label htmlFor="" className="d-block">
                To:
              </label>
              <input
                type="date"
                value={dateTo || ""}
                onChange={(e) => handleChangeQuery("dateTo", e.target.value)}
                className="bg-white block px-3 py-2 rounded-md shadow-sm border-gray-300 focus:outline-none focus:border-[#00a3f5]"
              />
            </div>
          </div>
          <div className="flex items-center">
            <Link
              className="flex gap-2 items-center bg-[#00a3f5] text-white font-medium px-4 py-2 rounded-md"
              href={pathnames.CREATE_LOAN}
            >
              <RiEditFill className="w-5 h-5" /> <span>New Loan</span>
            </Link>
          </div>
        </div>
        <div className="rounded-xl bg-white shadow p-6 overflow-x-auto">
          <h2 className="text-xl font-bold mb-4 ">Loans</h2>
          <LoansDataTable
            data={loansResult?.data}
            onSelect={(data) => {
              setSelectedLoan(data);
              handleChangeQuery("id", data?.id);
            }}
          />
        </div>
      </div>
      <ViewLoanModal
        isOpen={!!id}
        id={id as string}
        loan={selectedLoan}
        refetch={() => loansQuery.refetch()}
        onClose={() => handleChangeQuery("id", "")}
      />
    </div>
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
