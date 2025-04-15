"use client";

import React from "react";
import { BiSearch } from "react-icons/bi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MessageProps } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { AiOutlineLoading } from "react-icons/ai";
import MessageRepository from "@/repository/messageRepository";
import metadata from "libphonenumber-js/metadata.full";
import moment from "moment";
import ViewMessageModal from "./components/view-modal";

const loanStatuses = [
  { label: "All Loans", value: "" },
  { label: "Pending", value: "PENDING" },
  { label: "Approved", value: "APPROVED" },
  { label: "Rejected", value: "REJECTED" },
  { label: "Cancelled", value: "CANCELED" },
];

const Messages = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const page = searchParams.get("page");
  const status = searchParams.get("status");
  const limit = searchParams.get("limit");
  const dateTo = searchParams.get("dateTo");
  const dateFrom = searchParams.get("dateFrom");

  const messagesQuery = useQuery({
    queryKey: ["messages"],
    queryFn: () => MessageRepository.find(),
  });

  const result = messagesQuery?.data?.data?.data?.data as MessageProps[];

  return (
    <React.Fragment>
      <div className="flex flex-wrap justify-between gap-4 items-center mb-8">
        <div className="flex items-center gap-4">
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
        <div className="rounded-xl bg-white shadow p-6 overflow-x-auto">
          <h2 className="text-xl font-bold mb-4 ">Messages</h2>
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr className="">
                <th className="text-left py-2 px-4 text-nowrap font-semibold">Title</th>
                <th className="text-left py-2 px-4 text-nowrap font-semibold">Message</th>
                <th className="text-left py-2 px-4 text-nowrap font-semibold">Time</th>
                <th className="text-left py-2 px-4 text-nowrap font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {result?.map((item) => (
                <tr key={item?.id}>
                  <td className="text-left py-2 px-4 border-b border-b-gray-300 max-w-52 truncate">{item?.title}</td>
                  <td
                    className="text-left py-2 px-4 border-b border-b-gray-300 max-w-52 truncate"
                    title={item?.description}
                  >
                    {item?.description}
                  </td>
                  <td className="text-left py-2 px-4 border-b border-b-gray-300">
                    {moment(item.createdAt).format("YYYY-MM-DD LT")}
                  </td>
                  <td className="text-center py-2 px-4 border-b border-b-gray-300">
                    <Link href={`/user/message?id=${item?.id}`} replace={true} className="text-blue-700 underline">
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {messagesQuery?.isPending && !result?.length ? (
            <div className="h-full w-full flex items-center justify-center py-10">
              <div>
                <AiOutlineLoading className="h-12 w-12 animate-spin text-blue-700" />
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <ViewMessageModal
        isOpen={!!id}
        id={id as string}
        refetch={() => messagesQuery.refetch()}
        onClose={() => handleChangeQuery("id", "")}
      />
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

export default Messages;
