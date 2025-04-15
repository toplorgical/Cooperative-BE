import pathnames from "@/constants/pathnames";
import { redirect } from "next/navigation";

const Page = () => {
  return redirect(pathnames.USER_DASHBOARD);
};

export default Page;
