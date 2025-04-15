import ViewLoanModule from "@/modules/admin/loans/view";
import React from "react";

const Page = ({ params }: { params: { id: string } }) => {
  return <ViewLoanModule id={params.id} />;
};

export default Page;
