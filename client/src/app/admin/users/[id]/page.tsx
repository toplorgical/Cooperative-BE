import ViewUserModule from "@/modules/admin/users/view";
import React from "react";

// Generate static params for static export
export async function generateStaticParams() {
  // Return empty array since admin pages are dynamic
  // This allows the route to exist but be rendered client-side
  return [];
}

// Allow dynamic params
export const dynamicParams = true;

const Page = ({ params }: { params: { id: string } }) => {
  return <ViewUserModule id={params.id} />;
};

export default Page;
