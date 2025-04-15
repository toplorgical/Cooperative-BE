 
 
import ViewUserModule from "@/modules/admin/users/view";
import React from "react";

const Page = ({ params }: { params: { id: string } }) => {
  return <ViewUserModule id={params.id} />;
};

export default Page;
