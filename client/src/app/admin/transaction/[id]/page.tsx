 
import ViewTransactionModule from "@/modules/admin/transactions/view";
import React from "react";

const Page = ({ params }: { params: { id: string } }) => {
  return <ViewTransactionModule id={params.id} />;
};

export default Page;
