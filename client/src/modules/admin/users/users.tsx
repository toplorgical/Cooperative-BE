"use client";

import React from "react";
import { BiSearch } from "react-icons/bi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { UserQueryProps, UsersResultProps } from "@/types";
import { useQuery } from "@tanstack/react-query";
import currencyFormat from "@/utils/currencyFormat";
import { Button, Pagination, Select } from "flowbite-react";
import Link from "next/link";
import AdminRepository from "@/repository/adminRepository";
import { AiOutlineLoading } from "react-icons/ai";
import moment from "moment";
import { ReportButton } from "@/components/report-button";
import { IoSendOutline } from "react-icons/io5";
import BulkMailModal from "../components/bulk-mail-modal";

const Users = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const isVerified = searchParams.get("isVerified");
  const status = searchParams.get("status");
  const keyword = searchParams.get("keyword");
  const limit = searchParams.get("limit");
  const dateTo = searchParams.get("dateTo");
  const dateFrom = searchParams.get("dateFrom");
  const [isBulkMail, setIsBulkMail] = React.useState(false);

  const usersQuery = useQuery({
    queryKey: ["users", page, limit, dateFrom, dateTo, status, isVerified],
    queryFn: () => AdminRepository.findUsers({ limit, page, dateFrom, dateTo, keyword, isVerified } as UserQueryProps),
  });

  React.useEffect(() => {
    const timeoutId = setTimeout(() => usersQuery.refetch(), 1000);
    return () => clearTimeout(timeoutId);

    //eslint-disable-next-line
  }, [keyword]);

  const usersResult = usersQuery?.data?.data?.data as UsersResultProps;
  //   {
  //     data: {
  //       subeject: "",
  //       desc: "",
  // }
  //       usersQuery: {

  //     }
  //     loanQuery: {
  //      pending:"pending",
  //      pending:"pending",
  //     }
  //   }

  return (
    <React.Fragment>
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div className="text-lg font-semibold">Members</div>
        <Button outline color="blue" onClick={() => setIsBulkMail(true)}>
          <IoSendOutline className="mr-2 h-5 w-5" /> Send Bulk E-mail
        </Button>
      </div>
      <div className="flex flex-wrap justify-between gap-4 items-center mb-8">
        <ReportButton tableId={"user-table"} fileName={"Members"} data={usersResult as any} />
        <div className="flex items-center gap-4 flex-nowrap">
          <div className="flex items-center">
            <input
              type="text"
              value={keyword || ""}
              placeholder="Username / Email"
              onChange={(e) => handleChangeQuery("keyword", e.target.value)}
              className="block px-3 rounded-bl-md rounded-tl-md py-2 h-10 bg-white border-gray-300 focus:outline-none focus:border-blue-700"
            />
            <button className="bg-blue-700 border-blue-700 px-3 py-2 h-10 rounded-tr-md rounded-br-md ">
              <BiSearch className="text-white" />
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="overflow-x-auto shadow rounded-md bg-white mb-5">
          <table className="w-full" id="user-table">
            <thead className="bg-blue-700 text-white">
              <tr className="">
                <th className="text-left py-2 px-4 text-nowrap font-semibold">User</th>
                <th className="text-left py-2 px-4 text-nowrap font-semibold">Membership ID</th>
                <th className="text-center py-2 px-4 text-nowrap font-semibold">Email | Phone</th>
                <th className="text-center py-2 px-4 text-nowrap font-semibold">Joined At</th>
                <th className="text-left py-2 px-4 text-nowrap font-semibold">Balance</th>
                <th className="text-left py-2 px-4 text-nowrap font-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {usersResult?.data?.map((item) => (
                <tr key={item.id}>
                  <td className="text-left text-nowrap py-2 px-4 border-b border-b-gray-300">
                    {item?.firstName} {item?.lastName}
                  </td>
                  <td className="text-left py-2 text-nowrap px-4 border-b border-b-gray-300">{item?.registrationId}</td>
                  <td className="text-left py-2 px-4 border-b border-b-gray-300">
                    <span className="block text-nowrap text-center">{item?.phone}</span>
                  </td>
                  <td className="text-left py-2 px-4 border-b border-b-gray-300">
                    <span className="block text-nowrap text-center">
                      {moment(item?.createdAt).format("MMM Do, YYYY")}
                    </span>
                  </td>
                  <td className="text-left text-nowrap py-2 px-4 border-b border-b-gray-300">
                    {currencyFormat(item?.account?.balance)}
                  </td>
                  <td className="text-center py-2 px-4 border-b border-b-gray-300">
                    <Link href={`/admin/users/${item.id}`} className="text-blue-700 text-nowrap underline">
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {usersQuery.isPending && !usersResult?.data?.length ? (
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
            totalPages={usersResult?.totalPages || 1}
            onPageChange={(page) => handleChangeQuery("page", page)}
            showIcons
          />
        </div>
      </div>
      <BulkMailModal isOpen={isBulkMail} onClose={() => setIsBulkMail(false)} />
    </React.Fragment>
  );

  function handleChangeQuery(
    name: "page" | "limit" | "dateFrom" | "dateTo" | "loanTypeId" | "id" | "status" | "keyword",
    value: string | number
  ) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value as string);
    router.replace(`${pathname}?${params.toString()}`);
  }
};

export default Users;
